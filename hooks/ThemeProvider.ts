import React, { useContext } from "react";
import { ThemeContextType,Theme } from "../types/types";

export const ThemeContext = React.createContext<ThemeContextType>({ theme: Theme.dark, setTheme: theme => console.warn('no theme provider')});

export const useTheme = () =>useContext(ThemeContext)
