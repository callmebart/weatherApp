import getDayName from "../../utils/getDayName";
describe('getDayName', () => {
    it('should return "Today" for index 0', () => {
      const date = '2023-01-01T12:00:00Z';
      expect(getDayName(date, 0)).toBe('Today');
    });
  
    it('should return "Tomorrow" for index 1', () => {
      const date = '2023-01-02T12:00:00Z';
      expect(getDayName(date, 1)).toBe('Tomorrow');
    });
  
    it('should return the day of the week for other indexes', () => {
      const date = '2023-01-03T12:00:00Z';
      expect(getDayName(date, 4)).toBe('Tue');
    
    });
  });