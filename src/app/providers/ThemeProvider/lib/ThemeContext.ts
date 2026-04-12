import { Theme } from '../const/const';

export interface ThemeContextProps {
	theme?: Theme;
	setTheme?: (theme: Theme) => void;
}
