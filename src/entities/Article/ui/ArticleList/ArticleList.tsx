import React, { HTMLAttributeAnchorTarget } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.BIG ? 3 : 9)
		.fill(0)
		.map((item, index) => <ArticleListItemSkeleton view={view} key={index} />);

export const ArticleList: React.FC<ArticleListProps> = ({
	className,
	articles,
	view = ArticleView.SMALL,
	isLoading,
	target
}) => {
	const { t } = useTranslation();
	const renderArticles = (article: Article) => {
		return (
			<ArticleListItem target={target} article={article} view={view} className={styles.card} key={article.id} />
		);
	};

	if (!isLoading && !articles.length) {
		return (
			<div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
				<Text title={t('Articles is not found')} />
			</div>
		);
	}

	return (
		<div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
			{articles.length > 0 ? articles.map(article => renderArticles(article)) : null}
			{isLoading && getSkeletons(view)}
		</div>
	);
};
