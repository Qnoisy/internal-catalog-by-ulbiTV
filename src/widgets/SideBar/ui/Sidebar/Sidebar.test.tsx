import { fireEvent, screen } from '@testing-library/react';
import RenderWithTranslation from 'shared/lib/tests/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar test', () => {
	test('Sidebar render test', () => {
		RenderWithTranslation(<Sidebar />);
		const sibebar = screen.getByTestId('sidebar');
		expect(sibebar).toBeInTheDocument();
	});
	test('Sidebar toggle test', () => {
		RenderWithTranslation(<Sidebar />);
		const sibebar = screen.getByTestId('sidebar');
		const toggleButton = screen.getByTestId('sidebar-toggle');
		fireEvent.click(toggleButton);
		expect(sibebar).toHaveClass('collapsed');
	});
});
