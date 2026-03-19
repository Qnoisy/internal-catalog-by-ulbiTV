import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { VStack } from 'shared/ui/Stack';
import { rtkApi } from 'shared/api/rtkApi';
import cls from './ArticleRecommendationsList.module.scss';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { Article, ArticleView } from 'entities/Article';
import { useParams } from 'react-router-dom';

interface ArticleRecommendationsListProps {
	className?: string;
}

const recommendationsApi = rtkApi.injectEndpoints({
	endpoints: build => ({
		getArticleRecommendationsList: build.query({
			query: ({ limit, excludeId }) => ({
				url: '/articles',
				params: { _limit: limit, id_ne: excludeId }
			})
		})
	})
});

const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const { id } = useParams();
	const {
		isLoading,
		isError,
		data: articles
	} = useArticleRecommendationsList({
		limit: 4,
		excludeId: id!
	});

	if (isLoading || isError) return null;

	return (
		<VStack gap='8' className={classNames('', {}, [className])}>
			<Text size={TextSize.L} title={t('Recommends')} />
			<div className={cls.list}>
				{articles.map((article: Article) => (
					<ArticleListItem
						key={article.id}
						article={article}
						view={ArticleView.SMALL}
						target='_blank'
					/>
				))}
			</div>
		</VStack>
	);
});
