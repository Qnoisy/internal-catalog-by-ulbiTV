import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
	getArticlePageHasMore,
	getArticlePageisLoading,
	getArticlePageNum
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlePageSlice';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/fetchNextArticlesPage',
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;
		const hasMore = getArticlePageHasMore(getState());
		const page = getArticlePageNum(getState());
		const isLoading = getArticlePageisLoading(getState());

		if (hasMore && !isLoading) {
			dispatch(articlesPageActions.setPage(page + 1));
			dispatch(fetchArticlesList({}));
		}
	}
);
