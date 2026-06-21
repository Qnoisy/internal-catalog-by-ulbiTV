import { componentRender } from '@/shared/lib/tests/сomponentRender';
import AppRouter from './AppRouter';
import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { screen } from '@testing-library/react';
import { UserRole } from '@/entities/User';

describe('./AppRouter.test.tsx', () => {
	test('Initialization pages', async () => {
		componentRender(<AppRouter />, { route: getRouteAbout() });

		const component = await screen.findByTestId('AboutPage');
		expect(component).toBeInTheDocument();
	});
	test('NotFoundPage', async () => {
		componentRender(<AppRouter />, { route: '/awdawdaw' });

		const component = await screen.findByTestId('NotFoundPage');
		expect(component).toBeInTheDocument();
	});
	test('No autoruzation', async () => {
		componentRender(<AppRouter />, { route: getRouteProfile('1') });

		const component = await screen.findByTestId('MainPage');
		expect(component).toBeInTheDocument();
	});
	test('No autoruzation', async () => {
		componentRender(<AppRouter />, { route: getRouteProfile('1') });

		const component = await screen.findByTestId('MainPage');
		expect(component).toBeInTheDocument();
	});
	test('Autorization user', async () => {
		componentRender(<AppRouter />, {
			route: getRouteProfile('1'),
			initialState: { user: { _inited: true, authData: {} } }
		});

		const component = await screen.findByTestId('ProfilePage');
		expect(component).toBeInTheDocument();
	});
	test('Access denied', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAdminPanel(),
			initialState: { user: { _inited: true, authData: {} } }
		});

		const component = await screen.findByTestId('ForbiddenPage');
		expect(component).toBeInTheDocument();
	});

	test('Access succes', async () => {
		componentRender(<AppRouter />, {
			route: getRouteAdminPanel(),
			initialState: { user: { _inited: true, authData: { id: '1', roles: [UserRole.ADMIN] } } }
		});

		const component = await screen.findByTestId('AdminPanelPage');
		expect(component).toBeInTheDocument();
	});
});
