import _groupBy from "lodash/groupBy";
import hourlyForecast from "../store/HourlyForecast";

export default function getUniqueWeatherData(data) {
  const grouppedData = data.list.map((item) => {
    return {
      groupKey: item.dt_txt.slice(0, 10),
      ...item,
    }
  });

  const grouppedMappedData = _groupBy(grouppedData, "groupKey");
  hourlyForecast.setGrouppedData(grouppedMappedData);
  const groupKeys = Object.keys(grouppedMappedData);

  const meanDaysFromGroupsArray = groupKeys.map((item) => {
    return grouppedMappedData[item][2] || grouppedMappedData[item][0];
  });

  return meanDaysFromGroupsArray;
}