import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types/types';

export interface ArticlePageShema extends EntityState<Article> {
	isLoading?: boolean;
	error?: string;
	view: ArticleView;

	//pagination
	page: number;
	limit: number;
	hasMore: boolean;

	//filter
	sort: ArticleSortField;
	order: SortOrder;
	_inited: boolean;
	search: string;
	type: ArticleType;
}
