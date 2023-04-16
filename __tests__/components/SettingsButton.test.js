import { render } from "@testing-library/react-native";
import SettingsButton from "../../components/SettingsButton";

describe('SettingsButton', () => {
  it('should render', () => {
    const root  = render(<SettingsButton onPress={()=>null}/>).toJSON();
    expect(root).toMatchSnapshot();
  });
});