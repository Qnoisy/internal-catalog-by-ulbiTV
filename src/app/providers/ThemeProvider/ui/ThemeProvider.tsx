import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/contex/ThemeContext';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

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
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
	const [theme, setTheme] = useState<Theme>(initialTheme ?? getInitialTheme());
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme === Theme.DARK ? 'dark' : 'light');
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
	}, [theme]);

	const value = useMemo(() => ({ theme, setTheme }), [theme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
