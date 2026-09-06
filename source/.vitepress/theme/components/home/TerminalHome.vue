<script setup lang="ts">
import type { DefaultTheme } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { withBase } from "vitepress";
import { usePosts } from "vitepress-theme-teek";
import { workspaceSidebarItems } from "../../../config/sidebar/workspace";

const METER_KEYS = ["cpu", "mem", "net"] as const;
const METER_HISTORY_LENGTH = 28;
const ACTIVITY_CELL_COUNT = 182;
const timeFormatter = new Intl.DateTimeFormat("zh-CN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

type MeterKey = (typeof METER_KEYS)[number];
type MeterHistory = Record<MeterKey, number[]>;
type SidebarNode = DefaultTheme.SidebarItem & { items?: readonly SidebarNode[] };
type SectionMeta = { icon: string; folder: string; desc: string };
type TerminalSection = SectionMeta & { label: string; link: string; count: number };

const posts = usePosts();

const commandOpen = ref(false);
const activeCategory = ref(0);
const rainCanvas = ref<HTMLCanvasElement | null>(null);
const elapsed = ref(0);
const now = ref("--:--:--");
const bootLines = [
  "TimeByte BIOS v2.6 — POST ok",
  "mounting /dev/ideas ............ ok",
  "loading knowledge base ......... 6 modules",
  "starting shell ................. zsh 5.9",
] as const;
const meterHistory = ref<MeterHistory>({
  cpu: Array.from({ length: METER_HISTORY_LENGTH }, (_, index) => 24 + ((index * 7) % 45)),
  mem: Array.from({ length: METER_HISTORY_LENGTH }, (_, index) => 32 + ((index * 11) % 44)),
  net: Array.from({ length: METER_HISTORY_LENGTH }, (_, index) => 12 + ((index * 13) % 52)),
});
const activity = ref<number[]>(Array(ACTIVITY_CELL_COUNT).fill(0));

let clockTimer: ReturnType<typeof setInterval> | undefined;
let monitorTimer: ReturnType<typeof setInterval> | undefined;
let stopCodeRain: (() => void) | undefined;

const postCount = computed(() => posts.value.originPosts.length);
const uptime = computed(() => {
  const hours = Math.floor(elapsed.value / 3600);
  const minutes = Math.floor((elapsed.value % 3600) / 60);
  const seconds = elapsed.value % 60;
  return [hours, minutes, seconds].map(value => String(value).padStart(2, "0")).join(":");
});

const sectionMeta: Record<string, SectionMeta> = {
  Base: { icon: "📚", folder: "base", desc: "JavaScript、CSS 与浏览器运行机制" },
  Java: { icon: "☕️", folder: "java", desc: "JDK、基础语法、框架与数据访问" },
  Project: { icon: "🚀", folder: "project", desc: "项目实践、工具封装与性能优化" },
  "FE Frameworks": { icon: "🧩", folder: "framework", desc: "Vue、React、Taro 与前端架构实践" },
  Server: { icon: "⚡️", folder: "server", desc: "Node.js、数据库、Nginx 与部署" },
  TypeScript: { icon: "TS", folder: "typescript", desc: "类型系统、配置与工程化实践" },
  Plugin: { icon: "🧩", folder: "plugin", desc: "项目中常用的开发插件与扩展" },
  "Build Tools": { icon: "🛠️", folder: "build", desc: "Webpack、Vite、Rollup 等构建方案" },
  "Git Tutorials": { icon: "🌳", folder: "git", desc: "Git 工作流、Hooks 与协作技巧" },
  Other: { icon: "✨", folder: "other", desc: "Jenkins、开发工具与其他记录" },
};

const getFirstArticleLink = (items: readonly SidebarNode[] | undefined): string | undefined => {
  if (!items) return undefined;
  for (const item of items) {
    if ("link" in item && item.link) return item.link;
    const nestedLink = getFirstArticleLink(item.items);
    if (nestedLink) return nestedLink;
  }
  return undefined;
};

const countArticles = (items: readonly SidebarNode[] | undefined): number => {
  if (!items) return 0;
  return items.reduce((total, item) => total + ("link" in item && item.link ? 1 : countArticles(item.items)), 0);
};

const sections = computed<TerminalSection[]>(() =>
  (workspaceSidebarItems as readonly SidebarNode[]).flatMap(section => {
    const link = getFirstArticleLink(section.items);
    if (!link) return [];
    // 侧栏配置中的根分组均有 text；保留 VitePress 类型中该字段可选的兼容性。
    const label = section.text!;
    const meta = sectionMeta[label] ?? {
      icon: "▤",
      folder: label.toLowerCase().replace(/\s+/g, "-"),
      desc: `${label} 相关的技术探索与实践记录`,
    };
    return [{ ...meta, label, link, count: countArticles(section.items) }];
  })
);

const meterValue = (key: MeterKey) => meterHistory.value[key].at(-1) ?? 0;
const barStyle = (value: number, index: number) => ({
  height: `${Math.max(6, value)}%`,
  opacity: 0.25 + (index / (METER_HISTORY_LENGTH - 1)) * 0.75,
});

const nextMeterValue = (current: number) => Math.round(Math.max(8, Math.min(96, current + (Math.random() - 0.5) * 34)));

/** 首页目录直接跳至侧边栏分组的首篇真实文章，不在首页筛选或展开内容。 */
const sectionHref = (link: string) => withBase(link);
const openSearch = () => {
  commandOpen.value = true;
};

const keydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null;
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "") || target?.isContentEditable;
  if (isTyping || commandOpen.value) return;

  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
    return;
  }
  if (event.key === "~") {
    event.preventDefault();
    openSearch();
    return;
  }

  if (!sections.value.length) return;

  if (event.key === "j" || event.key === "ArrowDown") {
    event.preventDefault();
    activeCategory.value = (activeCategory.value + 1) % sections.value.length;
    return;
  }

  if (event.key === "k" || event.key === "ArrowUp") {
    event.preventDefault();
    activeCategory.value = (activeCategory.value - 1 + sections.value.length) % sections.value.length;
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    window.location.assign(sectionHref(sections.value[activeCategory.value].link));
    return;
  }

  const number = event.key === "0" ? 10 : Number(event.key);
  if (number >= 1 && number <= sections.value.length) {
    event.preventDefault();
    window.location.assign(sectionHref(sections.value[number - 1].link));
  }
};

const startCodeRain = () => {
  const canvas = rainCanvas.value;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || reducedMotion) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const glyphs = "01<>{}[]/\\$#@&*+=;:アイウエオカキクケコサシスセソ";
  const fontSize = 14;
  let columns: number[] = [];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let lastDraw = 0;
  let isVisible = true;
  let rainFrame = 0;

  const resize = () => {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const count = Math.ceil(width / fontSize);
    columns = Array.from({ length: count }, () => Math.floor((Math.random() * -height) / fontSize));
    context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  };

  const draw = (time: number) => {
    rainFrame = requestAnimationFrame(draw);
    if (!isVisible || time - lastDraw < 66) return;
    lastDraw = time;
    const darkMode = document.documentElement.classList.contains("dark");
    context.fillStyle = darkMode ? "rgba(10, 14, 20, .10)" : "rgba(244, 248, 247, .055)";
    context.fillRect(0, 0, width, height);
    for (let column = 0; column < columns.length; column += 1) {
      const y = columns[column] * fontSize;
      const highlight = Math.random() > 0.97;
      context.fillStyle = darkMode
        ? highlight
          ? "rgba(170, 255, 220, .55)"
          : "rgba(80, 220, 150, .22)"
        : highlight
          ? "rgba(2, 104, 75, .68)"
          : "rgba(7, 128, 91, .30)";
      context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], column * fontSize, y);
      columns[column] = y > height && Math.random() > 0.975 ? 0 : columns[column] + 1;
    }
  };

  const visibilityChange = () => {
    isVisible = !document.hidden;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", visibilityChange);
  rainFrame = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(rainFrame);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", visibilityChange);
  };
};

onMounted(() => {
  const startedAt = Date.now();
  const updateTime = () => {
    now.value = timeFormatter.format();
    elapsed.value = Math.floor((Date.now() - startedAt) / 1000);
  };
  updateTime();
  clockTimer = setInterval(updateTime, 1000);
  monitorTimer = setInterval(() => {
    METER_KEYS.forEach(key => {
      const current = meterValue(key);
      const next = nextMeterValue(current);
      meterHistory.value[key] = [...meterHistory.value[key].slice(1), next];
    });
  }, 420);
  activity.value = Array.from({ length: ACTIVITY_CELL_COUNT }, () =>
    Math.random() > 0.42 ? 1 + Math.floor(Math.random() * 4) : 0
  );
  window.addEventListener("keydown", keydown);
  stopCodeRain = startCodeRain();
});

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer);
  if (monitorTimer) clearInterval(monitorTimer);
  stopCodeRain?.();
  window.removeEventListener("keydown", keydown);
});
</script>

<template>
  <main class="tk-terminal-home" aria-label="TimeByte 首页">
    <canvas ref="rainCanvas" class="tk-terminal-rain" aria-hidden="true" />
    <section class="tk-terminal-window" aria-label="终端风格简介">
      <span class="tk-terminal-crt" aria-hidden="true" />
      <span class="tk-terminal-sweep" aria-hidden="true" />
      <div class="tk-terminal-titlebar">
        <span class="dot dot--red" />
        <span class="dot dot--yellow" />
        <span class="dot dot--green" />
        <span class="tk-terminal-title">timebyte@wkdev ~ zsh</span>
        <span class="tk-terminal-record">● REC 60fps</span>
      </div>
      <div class="tk-terminal-intro">
        <pre class="tk-terminal-ascii" aria-hidden="true">
      ______ _               _____        __
       |_   _ (_)_ __ ___  ___| __ ) _   _| |_ ___
         | | | | '_ ` _ \/ _ \   _ \| | | | __/ _ \
         | | | | | | | | |  __/ |_) | |_| | ||  __/
         |_| |_|_| |_| |_|\___|____/ \__, |\__\___|
                                    |___/
        </pre>
        <p v-for="line in bootLines" :key="line" class="boot-line">
          [
          <span class="green">ok</span>
          ] {{ line }}
        </p>
        <p>
          <span class="green">➜</span>
          <span class="cyan">~</span>
          whoami
        </p>
        <p class="result terminal-glow">timebyte — 技术探索与分享的个人空间</p>
        <p>
          <span class="green">➜</span>
          <span class="cyan">~</span>
          <span class="tk-terminal-cursor" />
        </p>
      </div>
    </section>

    <section class="tk-terminal-status" aria-label="站点状态">
      <span>
        <b class="green">◉</b>
        online
      </span>
      <span>
        posts:
        <b class="cyan">{{ postCount }}</b>
      </span>
      <span>
        sections:
        <b class="cyan">{{ sections.length }}</b>
      </span>
      <span>
        build:
        <b class="cyan">0 img · 0 font</b>
      </span>
      <time>{{ now }}</time>
    </section>

    <section class="tk-terminal-monitor" aria-label="系统监视器">
      <p class="tk-monitor-title">
        <i />
        htop — session uptime
        <b class="cyan">{{ uptime }}</b>
      </p>
      <div class="tk-monitor-grid">
        <div v-for="key in METER_KEYS" :key="key" class="tk-monitor-item">
          <p>
            <span>{{ key.toUpperCase() }}</span>
            <b :class="`metric--${key}`">{{ meterValue(key) }}%</b>
          </p>
          <div class="tk-monitor-bars">
            <i v-for="(value, index) in meterHistory[key]" :key="index" :style="barStyle(value, index)" />
          </div>
        </div>
      </div>
    </section>

    <section class="tk-terminal-activity" aria-label="提交活跃度">
      <p>
        <span class="green">➜</span>
        ~ git log --graph --since=6.months
      </p>
      <div class="tk-activity-grid" aria-label="过去六个月的提交热力图">
        <i v-for="(level, day) in activity" :key="day" :class="`level-${level}`" />
      </div>
      <p class="legend">
        less
        <i class="level-0" />
        <i class="level-1" />
        <i class="level-2" />
        <i class="level-3" />
        <i class="level-4" />
        more
      </p>
    </section>

    <section class="tk-terminal-categories" aria-label="知识库导航">
      <p class="tk-command">
        <span class="green">➜</span>
        <span class="cyan">~</span>
        ls -l ./knowledge-base
        <small>（j / k 移动，Enter 打开，1-0 直达）</small>
      </p>
      <p class="total">total {{ sections.length }}</p>
      <ul>
        <li
          v-for="(section, index) in sections"
          :key="section.label"
          :class="{ 'is-active': activeCategory === index }"
        >
          <a
            :href="sectionHref(section.link)"
            :aria-current="activeCategory === index ? 'true' : undefined"
            @mouseenter="activeCategory = index"
            @focus="activeCategory = index"
          >
            <span class="row-index">{{ index === activeCategory ? "▸" : index + 1 }}</span>
            <span class="permissions">drwxr-xr-x</span>
            <span class="size">{{ (section.count / 10 + 1.6).toFixed(1) }}K</span>
            <span class="entry">
              <b :class="{ 'text-icon': section.icon === 'TS' }">{{ section.icon }}</b>
              <strong :class="{ green: index === activeCategory, cyan: index !== activeCategory }">
                {{ section.folder }}/
              </strong>
              {{ section.label }}
              <em>{{ section.count }} articles</em>
              <small>{{ section.desc }}</small>
            </span>
            <span class="row-arrow">→</span>
          </a>
        </li>
      </ul>
    </section>

    <p class="tk-terminal-action">
      <button type="button" @click="openSearch">
        按
        <kbd>~</kbd>
        或
        <kbd>⌘K</kbd>
        打开命令面板
      </button>
    </p>

    <div
      v-if="commandOpen"
      class="tk-terminal-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="命令面板"
      @click.self="commandOpen = false"
    >
      <div>
        <button class="dialog-close" type="button" aria-label="关闭" @click="commandOpen = false">×</button>
        <p>
          <span class="green">➜</span>
          command palette
        </p>
        <input autofocus placeholder="输入要前往的页面…" />
        <a :href="withBase('/archives')">归档</a>
        <a :href="withBase('/categories')">分类</a>
        <a :href="withBase('/tags')">标签</a>
      </div>
    </div>
  </main>
</template>
