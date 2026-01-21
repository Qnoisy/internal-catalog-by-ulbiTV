import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

import { fetchCommentsByArticleId } from '../service/fetchCommentByArticleId';
import { ArticleDetailCommentsShema } from '../types/ArticleDetailCommentsShema';

export const commentsAdapter = createEntityAdapter<Comment>({
	selectId: (comment: Comment) => comment.id
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	state => state.articleDetailsPage?.comments || commentsAdapter.getInitialState()
);

const articleDetailsCommentsSlice = createSlice({
	name: 'books',
	initialState: commentsAdapter.getInitialState<ArticleDetailCommentsShema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCommentsByArticleId.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
				state.isLoading = false;
				commentsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice;
