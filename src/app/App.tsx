import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/SideBar';
import { classNames } from '../shared/lib/classNames/classNames';

import { UserActions } from 'entities/User';
import { useDispatch } from 'react-redux';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';

const App = () => {
	const { theme } = useTheme();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(UserActions.initAuthData());
	}, [dispatch]);

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
