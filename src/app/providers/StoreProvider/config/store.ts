import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CounterReducer } from 'entities/Counter';
import { UserReducer } from 'entities/User';
import { NavigateOptions, To } from 'react-router-dom';
import { $api } from 'shared/api/api';
import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './stateSchema';
import { ScrolSaveReducer } from 'features/ScrollSave/model/slice/ScrollSaveSlice';
import { rtkApi } from 'shared/api/rtkApi';

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducer: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		counter: CounterReducer,
		user: UserReducer,
		scrollSave: ScrolSaveReducer,
		[rtkApi.reducerPath]: rtkApi.reducer
		// login: loginReducer
	};

	const reducerManager = createReducerManager(rootReducer);

	const extraArg: ThunkExtraArg = { api: $api };

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg
				}
			}).concat(rtkApi.middleware)
	});

	//@ts-ignore
	store.reducerManager = reducerManager;

	return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
