<template>
  <div class="weather" v-if="weatherData.adCode.city && weatherData.weather.weather">
    <span>{{ weatherData.adCode.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{
        weatherData.weather.winddirection?.endsWith("风")
          ? weatherData.weather.winddirection
          : weatherData.weather.winddirection + "风"
      }}&nbsp;
    </span>
    <span class="sm-hidden">{{ weatherData.weather.windpower }}</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { onMounted,reactive  } from 'vue';
import { getAdcode, getWeather, getOtherWeather } from "../api";

// 高德开发者 Key
const mainKey = "";

// 天气数据
const weatherData = reactive({
  adCode: {
    city: null, // 城市
    adcode: null, // 城市编码
  },
  weather: {
    weather: null, // 天气现象
    temperature: null, // 实时气温
    winddirection: null, // 风向描述
    windpower: null, // 风力级别
  },
});

// 取出天气平均值
const getTemperature = (min, max) => {
  try {
    // 提取数字部分
    const minTemp = parseFloat(min.replace(/[^\d.-]/g, ""));
    const maxTemp = parseFloat(max.replace(/[^\d.-]/g, ""));
    
    if (isNaN(minTemp) || isNaN(maxTemp)) {
      throw new Error("输入值无法转换为数字");
    }

    // 计算平均值并四舍五入
    const average = (minTemp + maxTemp) / 2;
    return Math.round(average);
  } catch (error) {
    console.error("计算温度出现错误：", error);
    return "NaN";
  }
};

// 获取天气数据
const getWeatherData = async () => {
  try {
    // 获取地理位置信息
    if (!mainKey) {
      const res = await getOtherWeather('北京市');
      const{success, air, city, data} = res
      
      weatherData.adCode = {
        city: res.city || "未知地区",
        // adcode: data.city.cityId,
      };
      weatherData.weather = {
        weather: data.type,
        temperature: getTemperature(data.low, data.high),
        winddirection: data.fengxiang,
        windpower: data.fengli,
      };
    } else {
      // 获取 Adcode
      const adCode = await getAdcode(mainKey);
      console.log(adCode);
      if (adCode.infocode !== "10000") {
        throw "地区查询失败";
      }
      weatherData.adCode = {
        city: adCode.city,
        adcode: adCode.adcode,
      };
      // 获取天气信息
      const result = await getWeather("北京");
      console.log(result, 'result');
      
      weatherData.weather = {
        weather: result.lives[0].weather,
        temperature: result.lives[0].temperature,
        winddirection: result.lives[0].winddirection,
        windpower: result.lives[0].windpower,
      };
    }
  } catch (error) {
    console.error("天气信息获取失败:" + error);
  }
};


onMounted(() => {
  // 调用获取天气
  getWeatherData();
});
</script>
