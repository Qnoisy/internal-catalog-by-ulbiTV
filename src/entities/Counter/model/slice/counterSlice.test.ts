import { CounterSchema } from '../types/counterSchema';
import { CounterActions, CounterReducer } from './counterSlice';

describe('counterSlice', () => {
	test('decrement', () => {
		const state: CounterSchema = { value: 10 };
		expect(CounterReducer(state, CounterActions.decrement())).toEqual({ value: 9 });
	});
});
describe('counterSlice', () => {
	test('increment', () => {
		const state: CounterSchema = { value: 10 };
		expect(CounterReducer(state, CounterActions.increment())).toEqual({ value: 11 });
	});
	test('should work with empty state', () => {
		expect(CounterReducer(undefined, CounterActions.increment())).toEqual({ value: 1 });
	});
});
