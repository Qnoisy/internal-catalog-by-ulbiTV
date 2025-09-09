import { FC, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const systemPrefersDark = () =>
	typeof window !== 'undefined' &&
	window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches;

const getInitialTheme = (): Theme => {
	const saved = (typeof localStorage !== 'undefined' &&
		localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) as Theme | null;
	if (saved === Theme.LIGHT || saved === Theme.DARK) return saved;
	return systemPrefersDark() ? Theme.DARK : Theme.LIGHT;
};

interface ThemeProviderProps {
	initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
	const [theme, setTheme] = useState<Theme>(initialTheme ?? getInitialTheme());
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme === Theme.DARK ? 'dark' : 'light');
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
	}, [theme]);

	const value = useMemo(() => ({ theme, setTheme }), [theme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
