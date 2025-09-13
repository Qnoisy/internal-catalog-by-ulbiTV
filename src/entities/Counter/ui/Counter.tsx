import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { CounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
	const counterValue = useSelector(getCounterValue);
	const dispatch = useDispatch();
	const increment = () => {
		dispatch(CounterActions.increment());
	};
	const decrement = () => {
		dispatch(CounterActions.decrement());
	};
	return (
		<div>
			<h1 data-testid='value-title'>{counterValue}</h1>
			<Button data-testid='btn-increment' onClick={increment}>
				increment
			</Button>
			<Button data-testid='btn-decrement' onClick={decrement}>
				decrement
			</Button>
		</div>
	);
};
