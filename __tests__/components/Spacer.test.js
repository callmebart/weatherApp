import { render } from "@testing-library/react-native";
import Spacer from "../../components/Spacer";

describe('Spacer', () => {
  it('should render a View with a style that has a height of 8 times the spacingValue prop', () => {
    const root  = render(<Spacer spacingValue={2} />).toJSON();
    expect(root).toMatchSnapshot();
  });
});
