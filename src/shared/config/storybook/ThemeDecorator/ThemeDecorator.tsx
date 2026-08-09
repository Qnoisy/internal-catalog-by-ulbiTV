import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => () => (
	<ThemeProvider initialTheme={theme}>
		<div className={`app ${theme}`}></div>
	</ThemeProvider>
);
