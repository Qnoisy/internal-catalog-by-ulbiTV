import {
	Article,
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView
} from 'entities/Article/model/types/article';
import React, { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleListItem.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: React.FC<ArticleListItemProps> = ({ className, article, view, target }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const types = <Text text={article.type.join(', ')} className={styles.types} />;
	const views = (
		<>
			<Text text={String(article.views)} className={styles.views} />
			<Icon Svg={EyeIcon} />
		</>
	);


	if (view === ArticleView.BIG) {
		const textBlock = article.blocks.find(
			block => block.type === ArticleBlockType.TEXT
		) as ArticleTextBlock;

		return (
			<div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
				<Card className={styles.card}>
					<div className={styles.header}>
						<Avatar size={30} src={article.user.avatar} />
						<Text text={article.user.username} className={styles.username} />
						<Text text={article.createdAt} className={styles.date} />
					</div>
					<Text title={article.title} className={styles.title} />
					{types}
					<img src={article.img} className={styles.img} alt={article.title} />
					{textBlock && (
						<ArticleTextBlockComponent block={textBlock} className={styles.textBlock} />
					)}
					<div className={styles.footer}>
						<AppLink target={target} to={RoutePath.article_details + article.id}>
						<Button theme={ButtonTheme.OUTLINE}>
							{t('Read more')}
						</Button></AppLink>
						{views}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<AppLink target={target} to={RoutePath.article_details + article.id} className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
			<Card className={styles.card}>
				<div className={styles.imageWrapper}>
					<img alt={article.title} src={article.img} className={styles.img} />
					<Text text={article.createdAt} className={styles.date} />
				</div>
				<div className={styles.infoWrapper}>
					{types}
					{views}
				</div>
				<Text text={article.title} className={styles.title} />
			</Card>
		</AppLink>
	);
};
