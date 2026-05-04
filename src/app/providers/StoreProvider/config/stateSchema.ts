import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import type { ArticleDetailsShema } from '@/entities/Article';
import type { CounterSchema } from '@/entities/Counter';

import { UserSchema } from '@/entities/User';
import { AddCommentFormShema } from '@/features/AddCommentForm';

import type { loginSchema } from '@/features/AuthByUsername';
import type { ProfileShema } from '@/features/editableProfileCard/model/types/editableProfileCardSchema';
import type { ScrollSaveShema } from '@/features/ScrollSave';
import type { ArticleDetailsPageShema } from '@/pages/ArticleDetaildsPage/model/types';
import type { ArticlePageShema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReduxStore } from './store';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	scrollSave: ScrollSaveShema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

	login?: loginSchema;
	profile?: ProfileShema;
	articleDetails?: ArticleDetailsShema;
	addCommentForm?: AddCommentFormShema;
	articlesPage?: ArticlePageShema;
	// articleDetailsRecommendations?: ArticleDetailsRecommendationsShema;
	// articleDetailsComments?: ArticleDetailCommentsShema;
	articleDetailsPage?: ArticleDetailsPageShema;
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
}
export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
