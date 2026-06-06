<template>
  <TkPageCard class="tk-calendar-card">
    <div class="card-widget">
      <div class="item-headline">
        <svg class="item-headline-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64"
          ></path>
        </svg>
        <span>日历</span>
      </div>
      <div class="item-content">
        <div class="calendar-area-left">
          <div class="calendar-week">第{{ weekNumber }}周&nbsp;{{ weekDays[today.getDay()] }}</div>
          <div class="calendar-date">{{ today.getDate() }}</div>
          <div class="calendar-solar">{{ today.getFullYear() }}年{{ today.getMonth() + 1 }}月第{{ dayOfYear }}天</div>
          <div class="calendar-lunar">{{ lunarYear }}&nbsp;{{ lunarMonth }}&nbsp;{{ lunarDay }}</div>
        </div>
        <div class="calendar-area-right">
          <div class="calendar-main">
            <!-- 星期标题行 -->
            <div class="calendar-row calendar-r0">
              <div class="calendar-d0"><a>日</a></div>
              <div class="calendar-d1"><a>一</a></div>
              <div class="calendar-d2"><a>二</a></div>
              <div class="calendar-d3"><a>三</a></div>
              <div class="calendar-d4"><a>四</a></div>
              <div class="calendar-d5"><a>五</a></div>
              <div class="calendar-d6"><a>六</a></div>
            </div>

            <!-- 日期行 -->
            <div
              v-for="(week, weekIndex) in calendarWeeks"
              :key="weekIndex"
              class="calendar-row"
              :class="`calendar-r${weekIndex + 1}`"
            >
              <div v-for="(day, dayIndex) in week" :key="dayIndex" :class="`calendar-d${dayIndex}`">
                <a :class="{ now: day.isToday, 'other-month': day.isOtherMonth }" v-if="day.date">
                  {{ day.date }}
                </a>
                <a v-else></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TkPageCard>
</template>

<script setup>
import { TkPageCard } from "vitepress-theme-teek";
import { ref, onMounted, computed } from "vue";

// 星期几中文映射
const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

// 当前日期
const today = ref(new Date());

// 生成当前月份的日历数据
const calendarWeeks = computed(() => {
  const year = today.value.getFullYear();
  const month = today.value.getMonth();

  // 当月第一天
  const firstDay = new Date(year, month, 1);
  // 当月最后一天
  const lastDay = new Date(year, month + 1, 0);

  // 日历需要显示的第一天（可能是上月的日期）
  const startDay = new Date(firstDay);
  startDay.setDate(firstDay.getDate() - firstDay.getDay());

  // 日历需要显示的最后一天（可能是下月的日期）
  const endDay = new Date(lastDay);
  if (endDay.getDay() < 6) {
    endDay.setDate(lastDay.getDate() + (6 - endDay.getDay()));
  }

  // 生成日历数据
  const weeks = [];
  let currentDay = new Date(startDay);

  while (currentDay <= endDay) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = currentDay.getDate();
      const isToday = currentDay.toDateString() === today.value.toDateString();
      const isOtherMonth = currentDay.getMonth() !== month;

      week.push({ date, isToday, isOtherMonth });

      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
});

// 计算当前是今年的第几天
const dayOfYear = computed(() => {
  const start = new Date(today.value.getFullYear(), 0, 0);
  const diff = today.value - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
});

// 计算当前是第几周
const weekNumber = computed(() => {
  const firstDay = new Date(today.value.getFullYear(), 0, 1);
  const pastDaysOfYear = (today.value - firstDay) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7);
});

// 农历转换相关
const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0,
  0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54,
  0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7,
  0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550,
  0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570,
  0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540,
  0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5,
  0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
  0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0,
  0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2,
  0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
];

const gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const lunarMonths = [
  "正月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const lunarDays = [
  "初一",
  "初二",
  "初三",
  "初四",
  "初五",
  "初六",
  "初七",
  "初八",
  "初九",
  "初十",
  "十一",
  "十二",
  "十三",
  "十四",
  "十五",
  "十六",
  "十七",
  "十八",
  "十九",
  "二十",
  "廿一",
  "廿二",
  "廿三",
  "廿四",
  "廿五",
  "廿六",
  "廿七",
  "廿八",
  "廿九",
  "三十",
];

// 转换为农历
const getLunarDate = date => {
  const year = date.getFullYear();

  let lunarMonthIdx = 0;
  let lunarDayIdx = 0;

  const offset = Math.floor((date - new Date(year, 0, 0)) / 86400000);
  let days = 0;
  let i = 0;

  for (; i < 12; i++) {
    const monthDays = (lunarInfo[year - 1900] >> (12 - i)) & 0x1 ? 30 : 29;
    if (days + monthDays >= offset) {
      lunarDayIdx = offset - days - 1;
      break;
    }
    days += monthDays;
  }
  lunarMonthIdx = i;

  // 计算农历年的干支和生肖
  const ganIndex = (year - 3) % 10;
  const zhiIndex = (year - 3) % 12;
  const lunarYearStr = `${gan[ganIndex]}${zhi[zhiIndex]}${animals[zhiIndex]}年`;

  return {
    lunarYear: lunarYearStr,
    lunarMonth: lunarMonths[lunarMonthIdx],
    lunarDay: lunarDays[lunarDayIdx],
  };
};

// 响应式农历数据
const lunarDate = computed(() => getLunarDate(today.value));
const lunarYear = computed(() => lunarDate.value.lunarYear);
const lunarMonth = computed(() => lunarDate.value.lunarMonth);
const lunarDay = computed(() => lunarDate.value.lunarDay);

// 每天更新一次日历
onMounted(() => {
  const checkUpdate = () => {
    const now = new Date();
    if (now.toDateString() !== today.value.toDateString()) {
      today.value = now;
    }
  };
  setInterval(checkUpdate, 60000);
});
</script>

<style scoped>
.card-widget {
  user-select: none;
}

.item-headline {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 0 8px 4px;
  font-size: 14px;
  font-weight: 700;
}

.item-headline-icon {
  width: 16px;
  height: 16px;
}

.item-content {
  display: flex;
  align-items: stretch;
}

/* ---- 左侧日期显示 ---- */
.calendar-area-left {
  position: relative;
  width: 45%;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.calendar-week {
  height: 1.2rem;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.calendar-date {
  height: 3rem;
  line-height: 1;
  font-size: 36px;
  letter-spacing: 3px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  display: flex;
  align-items: center;
  margin: 4px 0;
}

.calendar-solar {
  font-size: 11px;
  opacity: 0.7;
  margin-bottom: 2px;
}

.calendar-lunar {
  font-size: 11px;
  opacity: 0.85;
}

/* ---- 右侧日历网格 ---- */
.calendar-area-right {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.calendar-main {
  width: 100%;
}

.calendar-row {
  height: 1.2rem;
  display: flex;
}

.calendar-d0,
.calendar-d1,
.calendar-d2,
.calendar-d3,
.calendar-d4,
.calendar-d5,
.calendar-d6 {
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-main a {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.calendar-main a.now {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.calendar-main a.other-month {
  opacity: 0.35;
}
</style>
