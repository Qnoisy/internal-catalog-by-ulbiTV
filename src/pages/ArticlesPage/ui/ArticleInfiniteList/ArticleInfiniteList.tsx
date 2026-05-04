import React from 'react';
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { useSelector } from 'react-redux';
import { getArticles } from '@/pages/ArticlesPage/model/slice/articlePageSlice';
import {
	getArticlePageError,
	getArticlePageHasMore,
	getArticlePageisLoading,
	getArticlePageView
} from '@/pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface ArticleInfiniteListProps {
	className?: string;
	onLoadNextpart: () => void;
}

export const ArticleInfiniteList: React.FC<ArticleInfiniteListProps> = ({
	className,
	onLoadNextpart
}) => {
	const articles = useSelector(getArticles.selectAll);
	const view = useSelector(getArticlePageView);
	const error = useSelector(getArticlePageError);
	const isLoading = useSelector(getArticlePageisLoading);
	const { t } = useTranslation();

	if (error) {
		<Text text={t('an error occurred')} />;
	}

	return (
		<ArticleList
			articles={articles}
			view={view}
			isLoading={isLoading}
			onLoadNextpart={onLoadNextpart}
		/>
	);
};
