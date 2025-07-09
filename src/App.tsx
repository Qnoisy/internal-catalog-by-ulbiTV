import { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import './styles/index.scss';

const App = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className={`app ${theme}`}>
			<button onClick={toggleTheme}>Switch Theme</button>
			<Link to='/about'>Main</Link>
			<Link to='/'>About</Link>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/about'} element={<AboutPageAsync />} />
					<Route path={'/'} element={<MainPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	);
};

export default App;
