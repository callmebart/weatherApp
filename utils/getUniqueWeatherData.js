export default function getUniqueWeatherData(data) {
  return  [...new Map(data.list.map(item => [item.dt_txt.slice(0, 10), item])).values()];
}