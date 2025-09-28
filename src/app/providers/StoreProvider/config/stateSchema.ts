import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { CounterSchema } from 'entities/Counter';
import { ProfileShema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { loginSchema } from 'features/AuthByUsername';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	login?: loginSchema;
	profile?: ProfileShema;
}

export type StateSchemaKey = keyof StateSchema;
export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}
