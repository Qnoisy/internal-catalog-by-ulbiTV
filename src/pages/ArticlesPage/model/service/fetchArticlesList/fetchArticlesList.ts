import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
	getArticlePageLimit,
	getArticlePageNum,
	getArticlePageOrder,
	getArticlePageSearch,
	getArticlePageSort,
	getArticlePageType
} from '../../selectors/articlesPageSelectors';
import { addQueryParams } from 'shared/lib/addQueryParams/addQueryParams';
import { ArticleType } from 'entities/Article/model/types/article';

interface fetchArticlesListProps {
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	fetchArticlesListProps,
	ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (args, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi;
	const limit = getArticlePageLimit(getState());
	const sort = getArticlePageSort(getState());
	const search = getArticlePageSearch(getState());
	const order = getArticlePageOrder(getState());
	const page = getArticlePageNum(getState());
	const type = getArticlePageType(getState());

	try {
		addQueryParams({ sort, order, search, type });
		const response = await extra.api.get<Article[]>('/articles', {
			params: {
				_expand: 'user',
				_limit: limit,
				_page: page,
				_sort: sort,
				_order: order,
				type: type === ArticleType.ALL ? undefined : type,
				q: search
			}
		});

		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (e) {
		return rejectWithValue('error');
	}
});
