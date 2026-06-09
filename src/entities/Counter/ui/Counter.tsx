import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import {
	getCounterValue,
	useCounterValue
} from '../model/selectors/getCounterValue/getCounterValue';
import { CounterActions, useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
	const counterValue = useCounterValue();
	const dispatch = useDispatch();
	const { increment, decrement, add } = useCounterActions();

	const handleInc = () => {
		increment();
	};
	const handleDec = () => {
		decrement();
	};
	const handleAddFive = () => {
		add(5);
	};
	return (
		<div>
			<h1 data-testid='value-title'>{counterValue}</h1>
			<Button data-testid='btn-increment' onClick={handleInc}>
				increment
			</Button>
			<Button data-testid='btn-decrement' onClick={handleDec}>
				decrement
			</Button>
			<Button data-testid='btn-addFive' onClick={handleAddFive}>
				AddFive
			</Button>
		</div>
	);
};
