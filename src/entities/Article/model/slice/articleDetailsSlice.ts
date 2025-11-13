import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../service/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsShema } from '../types/articleDetailsShema';

const initialState: ArticleDetailsShema = {
	data: undefined,
	isLoading: false,
	error: undefined
};

export const articleDetailsSlice = createSlice({
	name: 'articleDetails',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchArticleById.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
				state.isLoading = false;
				state.data = action.payload;
			})
			.addCase(fetchArticleById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
