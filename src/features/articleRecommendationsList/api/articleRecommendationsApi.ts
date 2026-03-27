import { Article } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

interface params {
	limit: number;
	excludeId: string | number;
}

const recommendationsApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getArticleRecommendationsList: build.query<Article[], params>({
			query: ({ limit, excludeId }) => ({
				url: '/articles',
				params: { _limit: limit, id_ne: excludeId }
			})
		})
	})
});

export const useArticleRecommendationsList =
	recommendationsApi.useGetArticleRecommendationsListQuery;
