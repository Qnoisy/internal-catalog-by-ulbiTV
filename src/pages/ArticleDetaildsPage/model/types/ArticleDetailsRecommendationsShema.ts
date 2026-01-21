import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

export interface ArticleDetailsRecommendationsShema extends EntityState<Article> {
	isLoading: boolean;
	error: string | undefined;
}
