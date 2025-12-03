import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetails';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { fetchCommentsByArticleId } from './fetchCommentByArticleId';

export const addCommentFormArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
	'articleDetails/addCommentFormArticle',
	async (text, thunkApi) => {
		const { extra, dispatch, rejectWithValue, getState } = thunkApi;

		try {
			const userData = getUserAuthData(getState());
			const article = getArticleDetailsData(getState());

			if (!userData || !text || !article) {
				return rejectWithValue('error');
			}

			const response = await extra.api.post<Comment>('/comments', {
				articleId: article.id,
				userId: userData.id,
				text
			});

			if (!response.data) {
				throw new Error();
			}

			dispatch(fetchCommentsByArticleId(article.id));

			return response.data;
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);
