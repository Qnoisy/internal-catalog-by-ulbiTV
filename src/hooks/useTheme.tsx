import { useContext } from 'react';
import {
	LOCAL_STORAGE_THEME_KEY,
	Theme,
	ThemeContext,
} from '../theme/ThemeContext';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

const useTheme = (): UseThemeResult => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
		setTheme(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		console.log(newTheme);
	};
	return { theme, toggleTheme };
};

export default useTheme;
