/**
 * 菱形鼠标粒子拖尾特效 — 全部可调参数
 * 修改此文件即可调整颜色、大小、拖尾长度、生命周期、扩散速度等
 */
export const PARTICLE_TRAIL_CONFIG = {
  /** 总开关 */
  enabled: true,

  /** 桌面端最小宽度（px），>768px 启用，移动端自动禁用 */
  desktopMinWidth: 769,

  /** 粒子层 z-index */
  zIndex: 9999,

  /** 亮色颜色池：蓝、红、绿、紫等 */
  colors: [
    "#4fc3f7",
    "#f44336",
    "#66bb6a",
    "#ab47bc",
    "#ffeb3b",
    "#ff7043",
    "#42a5f5",
    "#ec407a",
    "#26c6da",
    "#7e57c2",
  ],

  /** 粒子大小（px，随机范围） */
  size: { min: 4, max: 14 },

  /** 拖尾生成控制 */
  spawn: {
    /** 鼠标移动超过此距离（px）才生成粒子 */
    minDistance: 6,
    /** 每次生成数量（随机范围） */
    countPerSpawn: { min: 1, max: 3 },
  },

  /** 鼠标点击爆发粒子 */
  click: {
    enabled: true,
    /** 点击时生成数量（随机范围），比拖尾更密集 */
    count: { min: 10, max: 16 },
    /** 点击粒子大小（随机范围），略大于拖尾 */
    size: { min: 6, max: 18 },
    /** 点击扩散速度（随机范围），向外爆发感更强 */
    velocity: { min: 1.2, max: 3.5 },
    /** 点击粒子生命周期（帧数） */
    life: { min: 45, max: 90 },
  },

  /** 粒子池上限，防止性能问题 */
  maxParticles: 120,

  /**
   * 生命周期（帧数，60fps 下 60 帧 ≈ 1 秒）
   * 值越大拖尾越长
   */
  life: { min: 30, max: 72 },

  /** 扩散速度（px/帧，随机范围） */
  velocity: { min: 0.3, max: 1.8 },

  /** 速度衰减系数，模拟缓慢扩散 */
  friction: 0.96,

  /** 透明度：随生命周期从 start 线性降至 end（0 = 完全消失） */
  opacity: { start: 1, end: 0 },

  /** 缩小：随生命周期从 start 倍缩小至 end 倍 */
  shrink: { start: 1, end: 0.15 },

  /** 菱形旋转角度：π/4 = 45°，即正方形旋转成菱形 */
  rotation: Math.PI / 4,
} as const;

export type ParticleTrailConfig = typeof PARTICLE_TRAIL_CONFIG;
