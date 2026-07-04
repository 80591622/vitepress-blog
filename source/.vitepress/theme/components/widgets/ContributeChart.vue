<script setup lang="ts" name="ContributeChart">
import type { ECharts, EChartsCoreOption } from "echarts";
import { computed, nextTick, onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";
import { useData } from "vitepress";
import { formatDate, useIntersectionObserver, usePosts } from "vitepress-theme-teek";

type HeatmapPoint = [date: string, count: number];

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const chartRef = useTemplateRef("chartRef");
const { isDark } = useData();
const posts = usePosts();

let contributeChart: ECharts | undefined;
let echartsModule: typeof import("echarts") | undefined;

const today = new Date();
const startDate = new Date(today.getTime() - 364 * MS_PER_DAY);
const todayLabel = formatDate(today, "yyyy-MM-dd");
const startDateLabel = formatDate(startDate, "yyyy-MM-dd");

const contributeMap = computed(() => {
  const map = new Map<string, number>();

  posts.value.sortPostsByDate.forEach(item => {
    if (!item.date) return;
    const date = item.date.substring(0, 10);
    map.set(date, (map.get(date) ?? 0) + 1);
  });

  return map;
});

const contributeList = computed<HeatmapPoint[]>(() => Array.from(contributeMap.value.entries()).reverse());
const totalPosts = computed(() => contributeList.value.reduce((sum, [, count]) => sum + count, 0));
const activeDays = computed(() => contributeList.value.length);
const maxDailyCount = computed(() => Math.max(1, ...contributeList.value.map(([, count]) => count)));

const peakDay = computed(() => {
  return contributeList.value.reduce<HeatmapPoint | null>((best, current) => {
    if (!best || current[1] > best[1]) return current;
    return best;
  }, null);
});

const streak = computed(() => {
  const sortedDays = [...contributeList.value]
    .map(([date, count]) => ({ date, count, time: new Date(`${date}T00:00:00`).getTime() }))
    .sort((a, b) => a.time - b.time);

  let longest = 0;
  let current = 0;
  let previousTime: number | null = null;

  sortedDays.forEach(day => {
    if (previousTime !== null && day.time - previousTime === MS_PER_DAY) current += 1;
    else current = 1;

    longest = Math.max(longest, current);
    previousTime = day.time;
  });

  return longest;
});

const coverageLabel = computed(
  () => `${startDate.getFullYear()}.${startDate.getMonth() + 1} - ${today.getFullYear()}.${today.getMonth() + 1}`
);

const summaryItems = computed(() => [
  { label: "过去一年", value: `${totalPosts.value} 篇` },
  { label: "活跃天数", value: `${activeDays.value} 天` },
  { label: "最长连更", value: `${streak.value} 天` },
  { label: "单日峰值", value: peakDay.value ? `${peakDay.value[1]} 篇` : "0 篇" },
]);

const colorPalette = computed(() =>
  isDark.value
    ? {
        empty: "#202127",
        border: "#0f1115",
        text: "#c9d1d9",
        subtleText: "#8b949e",
        tooltipBg: "#11161c",
        colors: ["#202127", "#17324d", "#1d5b94", "#2d7fd5", "#5ca9ff"],
      }
    : {
        empty: "#f3f4f6",
        border: "#ffffff",
        text: "#334155",
        subtleText: "#94a3b8",
        tooltipBg: "#ffffff",
        colors: ["#f3f4f6", "#dbeafe", "#93c5fd", "#60a5fa", "#2563eb"],
      }
);

const heatLevelLabels = ["较少", "轻度", "稳定", "活跃", "高峰"];

const loadEcharts = async () => {
  if (!echartsModule) echartsModule = await import("echarts");
  return echartsModule;
};

const getSeriesColor = (value: number) => {
  const colors = colorPalette.value.colors;
  if (value <= 0) return colors[0];
  if (value === 1) return colors[1];
  if (value === 2) return colors[2];
  if (value <= 4) return colors[3];
  return colors[4];
};

const buildOption = (data: HeatmapPoint[]): EChartsCoreOption => ({
  animationDuration: 500,
  tooltip: {
    confine: true,
    backgroundColor: colorPalette.value.tooltipBg,
    borderWidth: 0,
    textStyle: {
      color: colorPalette.value.text,
      fontSize: 12,
    },
    formatter(params: unknown) {
      const point = params as { value: HeatmapPoint };
      const [date, count] = point.value;
      return `${date}<br/>发布 ${count} 篇文章`;
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: Math.max(4, maxDailyCount.value),
    inRange: {
      color: colorPalette.value.colors,
    },
  },
  calendar: {
    top: 40,
    left: 58,
    right: 20,
    bottom: 18,
    range: [startDateLabel, todayLabel],
    splitLine: {
      show: false,
    },
    cellSize: [14, 14],
    itemStyle: {
      color: colorPalette.value.empty,
      borderWidth: 2,
      borderColor: colorPalette.value.border,
      borderRadius: 4,
    },
    dayLabel: {
      firstDay: 1,
      margin: 10,
      color: colorPalette.value.subtleText,
      fontSize: 11,
      nameMap(value: string) {
        return ["一", "", "三", "", "五", "", ""][Number(value)] ?? "";
      },
    },
    monthLabel: {
      margin: 14,
      color: colorPalette.value.subtleText,
      fontSize: 12,
    },
    yearLabel: {
      show: false,
    },
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data,
    itemStyle: {
      color(params: { value: HeatmapPoint }) {
        return getSeriesColor(params.value[1]);
      },
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 8,
        shadowColor: isDark.value ? "rgba(92,169,255,0.35)" : "rgba(37,99,235,0.22)",
      },
    },
  },
});

const renderChart = async (data: HeatmapPoint[]) => {
  const echarts = await loadEcharts();
  if (!chartRef.value) return;

  if (!contributeChart) contributeChart = echarts.init(chartRef.value);
  contributeChart.setOption(buildOption(data), true);
  contributeChart.resize();
};

const handleResize = () => {
  contributeChart?.resize();
};

const { create } = useIntersectionObserver(
  chartRef,
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      requestAnimationFrame(() => {
        void renderChart(contributeList.value);
      });
    });
  },
  0.1
);

watch(
  [contributeList, isDark],
  async () => {
    await nextTick();
    await renderChart(contributeList.value);
  },
  { flush: "post" }
);

onMounted(() => {
  if (chartRef.value) create();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  contributeChart?.dispose();
  contributeChart = undefined;
});
</script>

<template>
  <section class="contribute__panel">
    <header class="panel__header">
      <div class="panel__headline">
        <h3>写作活跃度</h3>
        <p>{{ coverageLabel }}</p>
      </div>

      <div class="panel__legend" aria-label="热力等级">
        <span>少</span>
        <span
          v-for="(label, index) in heatLevelLabels"
          :key="label"
          class="legend__swatch"
          :style="{ backgroundColor: colorPalette.colors[index] }"
          :title="label"
        ></span>
        <span>多</span>
      </div>
    </header>

    <div class="panel__summary">
      <div v-for="item in summaryItems" :key="item.label" class="summary__item">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </div>

    <div class="contribute__chart">
      <div class="chart__box" ref="chartRef"></div>
    </div>
  </section>
</template>

<style>
.tk-article-page.tk-archives {
  width: min(1220px, 100%);
}

.tk-archives .contribute__panel {
  width: 100%;
  margin-bottom: 28px;
  padding: 20px 22px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.tk-archives .panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.tk-archives .panel__headline h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.tk-archives .panel__headline p {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tk-archives .panel__legend {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.tk-archives .legend__swatch {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.tk-archives .panel__summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 18px;
}

.tk-archives .summary__item {
  min-width: 0;
  padding: 10px 12px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--vp-c-default-soft) 76%, transparent);
}

.tk-archives .summary__item span {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.tk-archives .summary__item strong {
  display: block;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.tk-archives .contribute__chart {
  width: 100%;
  height: 210px;
}

.tk-archives .chart__box {
  width: 100%;
  height: 100%;
}

@media (max-width: 960px) {
  .tk-archives .contribute__panel {
    padding: 16px 14px 12px;
  }

  .tk-archives .panel__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .tk-archives .panel__summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tk-archives .contribute__chart {
    height: 196px;
  }
}

@media (max-width: 640px) {
  .tk-archives .panel__summary {
    grid-template-columns: 1fr;
  }

  .tk-archives .contribute__chart {
    height: 184px;
  }
}
</style>
