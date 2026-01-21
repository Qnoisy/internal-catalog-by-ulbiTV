import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageShema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice';


export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageShema>({
	comments: articleDetailsCommentsReducer,
	recommendations: articleDetailsRecommendationsReducer,
})