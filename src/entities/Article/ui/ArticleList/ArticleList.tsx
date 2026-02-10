import React, { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArticlesPageFilter } from 'pages/ArticlesPage/ui/ArticlesPageFilter/ArticlesPageFilter';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useParams } from 'react-router-dom';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
	onLoadNextpart?: () => void;
}

const getSkeletons = (view: ArticleView) =>
	new Array(3).fill(0).map((item, index) => <ArticleListItemSkeleton view={view} key={index} />);

export const ArticleList: React.FC<ArticleListProps> = ({
	className,
	articles,
	view = ArticleView.SMALL,
	isLoading,
	target,
	onLoadNextpart
}) => {
	const { t } = useTranslation();
	const { id } = useParams();
	const hasId = Boolean(id);
	const Header = useCallback(() => <ArticlesPageFilter />, []);

	const Footer = useCallback(() => {
		if (isLoading) return <div className={styles.sceleton}>{getSkeletons(view)}</div>;
		return null;
	}, [isLoading, view]);

	const renderArticles = useCallback(
		(index: number, article: Article) => (
			<ArticleListItem target={target} article={article} view={view} className={styles.card} />
		),
		[target, view]
	);

	const handleEndReached = useCallback(
		(index: number) => {
			onLoadNextpart?.();
		},
		[onLoadNextpart]
	);

	const GridComponents = {
		List: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
			({ style, children, ...props }, ref) => (
				<div
					ref={ref}
					{...props}
					style={{
						display: 'grid',
						gap: 20,
						gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
						paddingRight: 20,
						paddingTop: 20,
						...style
					}}
				>
					{children}
				</div>
			)
		),
		Item: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
			<div {...props}>{children}</div>
		)
	};

	if (!isLoading && !articles.length) {
		return (
			<div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
				<Text title={t('Articles is not found')} />
			</div>
		);
	}

	const mods: Mods = {
		[styles.left]: !id
	};

	return (
		<div className={classNames(styles.ArticleList, mods, [className, styles[view]])}>
			{view === ArticleView.BIG ? (
				<Virtuoso
					className={styles.list}
					data={articles}
					itemContent={renderArticles}
					endReached={handleEndReached}
					components={{ Header, Footer }}
				/>
			) : (
				<VirtuosoGrid
					className={styles.grid}
					data={articles}
					components={{ ...GridComponents, Header, Footer }}
					endReached={handleEndReached}
					itemContent={renderArticles}
				/>
			)}
		</div>
	);
};
