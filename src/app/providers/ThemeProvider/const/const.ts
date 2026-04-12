import { createContext } from 'react';
import { ThemeContextProps } from '../lib/ThemeContext';
export const LOCAL_STORAGE_THEME_KEY = 'theme';
export enum Theme {
	LIGHT = 'light',
	DARK = 'dark'
}
export const ThemeContext = createContext<ThemeContextProps>({
	theme: Theme.LIGHT,
	setTheme: () => {}
});
