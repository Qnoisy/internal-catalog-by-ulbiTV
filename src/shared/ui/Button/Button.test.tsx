import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

describe('Button test', () => {
	test('render test', () => {
		render(<Button>Test</Button>);
		const elem = screen.getByText('Test');
		expect(elem).toBeInTheDocument();
	});
	test('clear theme test', () => {
		render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);
		const elem = screen.getByText('Test');
		expect(elem).toHaveClass('clear');
		screen.debug();
	});
});
