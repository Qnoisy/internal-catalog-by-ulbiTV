import { useCallback, useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

const useTheme = (): UseThemeResult => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = useCallback(() => {
		setTheme?.(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
	}, [theme, setTheme]);
	return { theme: theme || Theme.LIGHT, toggleTheme };
};

export default useTheme;
