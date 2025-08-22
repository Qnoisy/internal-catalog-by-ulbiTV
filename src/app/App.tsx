import { Suspense, useState } from 'react';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/SideBar';
import { classNames } from '../shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';

const App = () => {
	const { theme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback=''>
				<Navbar />
				<div className='content-page'>
					<Sidebar />
					<AppRouter />
				</div>
			</Suspense>
		</div>
	);
};

export default App;
