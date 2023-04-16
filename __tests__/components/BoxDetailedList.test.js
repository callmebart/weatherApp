import { render } from "@testing-library/react-native";
import BoxDetailedList from "../../components/BoxDetailedList";

describe('BoxDetail', () => {
  it('should render', () => {
    const item ={"clouds": {"all": 89}, "dt": 1681797600, "dt_txt": "2023-04-18 06:00:00", "groupKey": "2023-04-18", "main": {"feels_like": 4.5, "grnd_level": 991, "humidity": 85, "pressure": 1020, "sea_level": 1020, "temp": 7.76, "temp_kf": 0, "temp_max": 7.76, "temp_min": 7.76}, "pop": 0, "sys": {"pod": "d"}, "visibility": 10000, "weather": [{"description": "overcast clouds", "icon": "04d", "id": 804, "main": "Clouds"}], "wind": {"deg": 70, "gust": 10.72, "speed": 5.73}}
    const root  = render(<BoxDetailedList item={item}/>).toJSON();
    expect(root).toMatchSnapshot();
  });
});