import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './shared/config/i18n/i18n';
render(
	<Suspense fallback={<div>Загрузка...</div>}>
		<BrowserRouter>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</Suspense>,
	document.getElementById('root')
);
