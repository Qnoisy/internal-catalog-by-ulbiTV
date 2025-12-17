import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlePageLimit } from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
	page: number;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	fetchArticlesListProps,
	ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (args, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi;
	const { page = 1 } = args;
	const limit = getArticlePageLimit(getState());

	try {
		const response = await extra.api.get<Article[]>('/articles', {
			params: {
				_expand: 'user',
				_limit: limit,
				_page: page
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
