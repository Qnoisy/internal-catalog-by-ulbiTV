import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/сomponentRender';
import { Counter } from './Counter';

describe('Counter component', () => {
	test('should return counter value', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		const couner = screen.getByTestId('value-title');
		expect(couner).toHaveTextContent('10');
	});
	test('increment', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		const couner = screen.getByTestId('value-title');
		const btn = screen.getByTestId('btn-increment');
		userEvent.click(btn);
		expect(couner).toHaveTextContent('11');
	});
	test('decrement', () => {
		componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
		const couner = screen.getByTestId('value-title');
		const btn = screen.getByTestId('btn-decrement');
		userEvent.click(btn);
		expect(couner).toHaveTextContent('9');
	});
});
