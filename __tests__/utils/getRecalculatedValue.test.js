import { CELSIUS_UNIT } from "../../consts/symbols";
import globalStore from "../../store/GlobalSettings";
import getRecalculatedValue from "../../utils/getRecalculatedValue";

describe('getRecalculatedValue', () => {
 
  it('should return the same value for Celsius unit', () => {
    expect(getRecalculatedValue(20)).toBe(20);
    expect(getRecalculatedValue(25.5)).toBe(25);
  });
});