import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
	getArticlePageHasMore,
	getArticlePageInited,
	getArticlePageisLoading,
	getArticlePageNum
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlePageSlice';

export const initArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
	'articlesPage/initArticlePage',
	async (_, thunkApi) => {
		const { getState, dispatch } = thunkApi;
			const _inited = getArticlePageInited(getState());

		if(!_inited){
			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({ page: 1 }));
		}
	}
);
