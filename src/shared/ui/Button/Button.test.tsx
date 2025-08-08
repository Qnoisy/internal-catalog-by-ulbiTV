import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

describe('Button test', () => {
	test('render test', () => {
		render(<Button>Test</Button>);
		const elem = screen.getByText('Test');
		expect(elem).toBeInTheDocument();
	});
	test('clear theme test', () => {
		render(<Button theme={ThemeButton.CLEAR}>Test</Button>);
		const elem = screen.getByText('Test');
		expect(elem).toHaveClass('clear');
		screen.debug();
	});
});
