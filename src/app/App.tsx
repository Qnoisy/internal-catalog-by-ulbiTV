import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/SideBar';
import { classNames } from '../shared/lib/classNames/classNames';

import { getUserInited, UserActions } from 'entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';

const App = () => {
	const { theme } = useTheme();
	const _inited = useSelector(getUserInited);
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
					{_inited && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
};

export default App;
