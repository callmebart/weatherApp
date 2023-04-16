import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
      expect(capitalizeFirstLetter('')).toBe('');
      expect(capitalizeFirstLetter(null)).toBe('');
      expect(capitalizeFirstLetter(undefined)).toBe('');
    });
  
  });