export enum Theme {
    dark = 'dark',
    light = 'light',
  }
  
  export type ThemeContextType = {
    theme: Theme;
    setTheme: (Theme: Theme) => void
  }