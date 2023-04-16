import { ImageAssets } from "../../assets/ImageAssets";
import getBackgroundImage from "../../utils/getBackgroundImage";

describe('getBackgroundImage', () => {
  it('should return the day image during daytime', () => {
    const mockDate = new Date(2022, 1, 1, 16, 30, 0); // 4:30 PM
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(getBackgroundImage()).toEqual(ImageAssets.dayImage);

    global.Date = Date;
  });

  it('should return the night image during nighttime', () => {
    const mockDate = new Date(2022, 1, 1, 22, 30, 0); // 10:30 PM
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(getBackgroundImage()).toEqual(ImageAssets.nightImage);

    global.Date = Date;
  });

  it('should return the morning image during morning time', () => {
    const mockDate = new Date(2022, 1, 1, 8, 30, 0); // 8:30 AM
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(getBackgroundImage()).toEqual(ImageAssets.morningImage);

    global.Date = Date;
  });
});