// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://api.vvhan.com/api/ian/shici?type=json");
  return await res.json();
};

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (city) => {
  const res = await fetch(
    `https://api.vvhan.com/api/weather?city=${city}`,
  );
  return await res.json();
};

//  API
// https://api.vvhan.com/article/qianming.html
export const getOtherWeather = async (city) => {
  const res = await fetch(`https://api.vvhan.com/api/weather?city=${city}`);
  return await res.json();
};