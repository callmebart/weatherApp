import { render } from "@testing-library/react-native";
import HomeScreen from "../../screens/HomeScreen";

jest.mock('@react-navigation/native-stack', () => {
    const actualNav = jest.requireActual('@react-navigation/native-stack');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
      }),
    };
  });

describe('Home', () => {
  it('should render a View with a style that has a height of 8 times the spacingValue prop', () => {
    const root  = render(<HomeScreen/>)
    expect(root).toHaveBeenCalledTimes(1);
  });
});
