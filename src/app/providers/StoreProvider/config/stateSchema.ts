import { ArticleDetails } from './../../../../entities/Article/ui/ArticleDetails/ArticleDetails';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore';
import { AxiosInstance } from 'axios';
import { ArticleDetailsShema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileShema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { AddCommentFormShema } from 'features/AddCommentForm';

import { loginSchema } from 'features/AuthByUsername';
import { ScrollSaveShema } from 'features/ScrollSave';
import { ArticleDetailCommentsShema } from 'pages/ArticleDetaildsPage';
import { ArticleDetailsPageShema } from 'pages/ArticleDetaildsPage/model/types';
import { ArticleDetailsRecommendationsShema } from 'pages/ArticleDetaildsPage/model/types/ArticleDetailsRecommendationsShema';
import { ArticlePageShema } from 'pages/ArticlesPage';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	scrollSave: ScrollSaveShema;

	login?: loginSchema;
	profile?: ProfileShema;
	articleDetails?: ArticleDetailsShema
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
