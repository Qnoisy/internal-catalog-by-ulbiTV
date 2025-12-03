import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import { ArticleDetailsShema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileShema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddCommentFormShema } from 'features/AddCommentForm';

import { loginSchema } from 'features/AuthByUsername';
import { ArticleDetailCommentsShema } from 'pages/ArticleDetaildsPage';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	login?: loginSchema;
	profile?: ProfileShema;
	articleDetails?: ArticleDetailsShema;
	articleDetailsComments?: ArticleDetailCommentsShema;
	addCommentForm?: AddCommentFormShema;
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

export interface ThunkExtraArg {
	api: AxiosInstance;
	navigate?: (to: To, options?: NavigateOptions) => void;
}
export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
