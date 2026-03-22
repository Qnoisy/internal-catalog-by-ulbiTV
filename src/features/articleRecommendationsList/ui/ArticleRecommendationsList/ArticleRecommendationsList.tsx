import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';

import cls from './ArticleRecommendationsList.module.scss';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { Article, ArticleView } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useArticleRecommendationsList } from 'features/articleRecommendationsList/api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
	className?: string;
}

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
