import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.BIG ? 3 : 9)
		.fill(0)
		.map((item, index) => <ArticleListItemSkeleton view={view} key={index} />);

export const ArticleList: React.FC<ArticleListProps> = ({
	className,
	articles,
	view = ArticleView.SMALL,
	isLoading
}) => {
	const renderArticles = (article: Article) => {
		return (
			<ArticleListItem article={article} view={view} className={styles.card} key={article.id} />
		);
	};

	return (
		<div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
			{articles.length > 0 ? articles.map(article => renderArticles(article)) : null}
			{isLoading && getSkeletons(view)}
		</div>
	);
};
