import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailCommentsShema } from '../types/ArticleDetailCommentsShema';
import { Article } from 'entities/Article';
import { fetchArticleRecommendations } from '../service/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsShema } from '../types/ArticleDetailsRecommendationsShema';

export const recommendationsAdapter = createEntityAdapter({
	selectId: (article: Article) => article.id
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
	state => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
);

const articleDetailsRecommendationsSlice = createSlice({
	name: 'articleDetailsRecommendationsSlice',
	initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsShema>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchArticleRecommendations.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchArticleRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
				state.isLoading = false;
				recommendationsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchArticleRecommendations.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	}
});

export const { actions: articleDetailsRecommendationsActions } = articleDetailsRecommendationsSlice;
export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice;
