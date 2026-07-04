import type { ParticleTrailConfig } from "./config";

/** 单个粒子状态 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

/** 在 [min, max] 范围内取随机数 */
function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** 在 [min, max] 范围内取随机整数 */
function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

/** 线性插值 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** 从颜色池中随机取色 */
function pickColor(colors: readonly string[]): string {
  return colors[Math.floor(Math.random() * colors.length)]!;
}

/** 单次生成粒子的参数覆盖 */
interface SpawnOptions {
  count: { min: number; max: number };
  size: { min: number; max: number };
  velocity: { min: number; max: number };
  life: { min: number; max: number };
}

/**
 * 菱形鼠标粒子拖尾 Canvas 引擎
 * 负责粒子生成、更新、绘制及资源清理
 */
export function useDiamondParticleTrail(config: ParticleTrailConfig) {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Particle[] = [];
  let rafId = 0;
  let running = false;

  let lastMouseX = -1;
  let lastMouseY = -1;

  /** 同步 canvas 尺寸以适配高清屏与窗口缩放 */
  function resizeCanvas(): void {
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const { innerWidth: w, innerHeight: h } = window;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /** 在指定位置生成粒子，扩散方向与速度随机 */
  function spawn(x: number, y: number, options?: SpawnOptions): void {
    const countRange = options?.count ?? config.spawn.countPerSpawn;
    const sizeRange = options?.size ?? config.size;
    const velocityRange = options?.velocity ?? config.velocity;
    const lifeRange = options?.life ?? config.life;

    const count = randomInt(countRange.min, countRange.max);

    for (let i = 0; i < count; i++) {
      if (particles.length >= config.maxParticles) {
        particles.shift();
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = randomBetween(velocityRange.min, velocityRange.max);
      const life = randomInt(lifeRange.min, lifeRange.max);

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: randomBetween(sizeRange.min, sizeRange.max),
        color: pickColor(config.colors),
        life,
        maxLife: life,
      });
    }
  }

  /** 鼠标点击：在点击位置爆发一圈菱形粒子 */
  function spawnClickBurst(x: number, y: number): void {
    if (!config.click.enabled) return;

    spawn(x, y, {
      count: config.click.count,
      size: config.click.size,
      velocity: config.click.velocity,
      life: config.click.life,
    });
  }

  /** 绘制旋转 45° 的菱形（正方形） */
  function drawDiamond(p: Particle, progress: number): void {
    if (!ctx) return;

    const alpha = lerp(config.opacity.start, config.opacity.end, progress);
    const size = p.size * lerp(config.shrink.start, config.shrink.end, progress);

    if (alpha <= 0 || size <= 0) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(config.rotation);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
  }

  /** 每帧更新粒子位置与生命周期 */
  function update(): void {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]!;

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= config.friction;
      p.vy *= config.friction;
      p.life--;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  /** 清空画布并绘制所有存活粒子 */
  function draw(): void {
    if (!ctx || !canvas) return;

    const { innerWidth: w, innerHeight: h } = window;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      const progress = 1 - p.life / p.maxLife;
      drawDiamond(p, progress);
    }
  }

  /** requestAnimationFrame 主循环 */
  function loop(): void {
    if (!running) return;

    update();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  /** 鼠标移动：超过距离阈值时生成拖尾粒子 */
  function onMouseMove(e: MouseEvent): void {
    const { clientX: x, clientY: y } = e;

    if (lastMouseX < 0) {
      lastMouseX = x;
      lastMouseY = y;
      spawn(x, y);
      return;
    }

    const dx = x - lastMouseX;
    const dy = y - lastMouseY;
    const dist = Math.hypot(dx, dy);

    if (dist >= config.spawn.minDistance) {
      spawn(x, y);
      lastMouseX = x;
      lastMouseY = y;
    }
  }

  /** 鼠标点击：在点击坐标爆发粒子（监听 window，canvas 为 pointer-events: none） */
  function onMouseClick(e: MouseEvent): void {
    spawnClickBurst(e.clientX, e.clientY);
  }

  function onResize(): void {
    resizeCanvas();
  }

  /** 初始化 canvas 上下文与事件监听 */
  function init(canvasEl: HTMLCanvasElement): void {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");

    if (!ctx) return;

    resizeCanvas();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onMouseClick, { passive: true });
  }

  /** 启动渲染循环 */
  function start(): void {
    if (running) return;

    running = true;
    rafId = requestAnimationFrame(loop);
  }

  /** 停止渲染并清理所有资源，防止内存泄漏 */
  function destroy(): void {
    running = false;
    cancelAnimationFrame(rafId);

    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("click", onMouseClick);

    particles = [];
    lastMouseX = -1;
    lastMouseY = -1;
    ctx = null;
    canvas = null;
  }

  return { init, start, destroy };
}
