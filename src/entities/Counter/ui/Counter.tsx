import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
	const dispatch = useDispatch();
	const counterValue = useCounterValue();
	const { t } = useTranslation();
	const { decrement, increment, add } = useCounterActions();

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
