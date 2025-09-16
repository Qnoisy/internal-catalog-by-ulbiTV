import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { UserReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './stateSchema';

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducer: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: CounterReducer,
		user: UserReducer
		// login: loginReducer
	};

	const reducerManager = createReducerManager(rootReducer);

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: __IS_DEV__,
		preloadedState: initialState
	});

	//@ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
