import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { Article, ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { articlesPageActions } from '../../slice/articlePageSlice';
import { SortOrder } from 'shared/types/types';
import { getArticlePageInited } from '../../selectors/articlesPageSelectors';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesPage/initArticlesPage',
	async (searchParams, thunkApi) => {
		const { getState, dispatch } = thunkApi;
		const inited = getArticlePageInited(getState());
		if (!inited) {
			const orderFromUrl = searchParams.get('order') as SortOrder;
			const sortFromUrl = searchParams.get('sort') as ArticleSortField;
			const searchFromUrl = searchParams.get('search');
			const typeFromUrl = searchParams.get('type') as ArticleType;

			if (sortFromUrl) {
				dispatch(articlesPageActions.setSort(sortFromUrl));
			}
			if (orderFromUrl) {
				dispatch(articlesPageActions.setOrder(orderFromUrl));
			}
			if (searchFromUrl) {
				dispatch(articlesPageActions.setSearch(searchFromUrl));
			}
			if (typeFromUrl) {
				dispatch(articlesPageActions.setType(typeFromUrl));
			}

			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({}));
		}
	}
);
