import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { StateSchema } from './stateSchema';

export function createReduxStore(initialState?: StateSchema) {
	return configureStore<StateSchema>({
		reducer: { counter: CounterReducer },
		devTools: __IS_DEV__,
		preloadedState: initialState
	});
}

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
