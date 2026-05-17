<script setup lang="ts" name="ContributeChart">
import * as echarts from "echarts";
import { ref, watch, nextTick, computed, useTemplateRef, onMounted } from "vue";
import { useData } from "vitepress";
import { formatDate, usePosts, useIntersectionObserver } from "vitepress-theme-teek";

const { isDark } = useData();
const posts = usePosts();

const today = formatDate(new Date(), "yyyy-MM-dd");
const beforeOnYear = formatDate(
  new Date(new Date().getTime() - 364 * 24 * 60 * 60 * 1000),
  "yyyy-MM-dd"
);

const contributeList = computed((): [string, number][] => {
  const contributeObject: Record<string, number> = {};

  posts.value.sortPostsByDate.forEach(item => {
    if (!item.date) return;
    const date = item.date.substring(0, 10);
    if (contributeObject[date]) contributeObject[date]++;
    else contributeObject[date] = 1;
  });

  const contributeDays = Object.keys(contributeObject);
  return contributeDays.map((item: string) => [item, contributeObject[item]] as [string, number]).reverse();
});

const chartRef = useTemplateRef("chartRef");
let contributeChart: echarts.ECharts | undefined;

const { create } = useIntersectionObserver(
  chartRef,
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          try {
            renderChart(contributeList.value);
          } catch (error) {
            console.error("初始化动画失败:", error);
          }
        });
      }
    });
  },
  0.1
);

const option = {
  tooltip: {
    formatter(params: unknown) {
      const p = params as { value: [string, number] };
      return `${p.value[0]} <br/> ${p.value[1]} 篇文章`;
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: 5,
    inRange: {
      color: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127", "#196127"],
    },
  },
  calendar: {
    left: "center",
    itemStyle: {
      color: "#ebedf0",
      borderWidth: 5,
      borderColor: "#fff",
      shadowBlur: 0,
    },
    cellSize: [20, 20],
    range: [beforeOnYear, today],
    splitLine: { show: true },
    dayLabel: {
      firstDay: 7,
      nameMap: "ZH",
      color: "#3c3c43",
    },
    monthLabel: {
      color: "#3c3c43",
    },
    yearLabel: {
      show: true,
      position: "right",
    },
    silent: {
      show: false,
    },
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data: [] as [string, number][],
  },
};

const renderChart = (data: [string, number][]) => {
  const cal = option.calendar as {
    itemStyle: { borderColor: string; color: string };
  };
  cal.itemStyle.borderColor = isDark.value ? "#1b1b1f" : "#fff";
  cal.itemStyle.color = isDark.value ? "#787878" : "#ebedf0";

  if (contributeChart) echarts.dispose(contributeChart);
  if (chartRef.value) contributeChart = echarts.init(chartRef.value);

  const series = option.series as { data: [string, number][]; type: string; coordinateSystem: string };
  series.data = data;
  contributeChart?.setOption(option as echarts.EChartsCoreOption);
};

watch(
  contributeList,
  async newValue => {
    await nextTick();
    renderChart(newValue);
  },
  { flush: "post" }
);

watch(isDark, async () => {
  await nextTick();
  renderChart(contributeList.value);
});

onMounted(() => {
  if (chartRef.value) create();
});
</script>

<template>
  <div class="contribute__chart">
    <div class="chart__box" ref="chartRef"></div>
  </div>
</template>

<style>
.tk-article-page.tk-archives {
  width: 1220px;
}

.tk-archives .contribute__chart {
  width: 100%;
  height: 260px;
}

.tk-archives .contribute__chart .chart__box {
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
