import { fireEvent, screen } from '@testing-library/react';

import { componentRender } from 'shared/lib/tests/сomponentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar test', () => {
	test('Sidebar render test', () => {
		componentRender(<Sidebar />);
		const sibebar = screen.getByTestId('sidebar');
		expect(sibebar).toBeInTheDocument();
	});
	test('Sidebar toggle test', () => {
		componentRender(<Sidebar />);
		const sibebar = screen.getByTestId('sidebar');
		const toggleButton = screen.getByTestId('sidebar-toggle');
		fireEvent.click(toggleButton);
		expect(sibebar).toHaveClass('collapsed');
	});
});
