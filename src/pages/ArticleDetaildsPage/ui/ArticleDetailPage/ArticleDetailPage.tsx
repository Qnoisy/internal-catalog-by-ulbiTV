import { ArticleDetails } from 'entities/Article';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticleDetailPage.module.scss';

interface ArticleDetailPageProps {
	className?: string;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('articles');
	if (!id) {
		return (
			<div className={classNames(styles.ArticleDetailPage, {}, [className])}>
				{t('Article not found')}
			</div>
		);
	}

	return (
		<div className={classNames(styles.ArticleDetailPage, {}, [className])}>
			<ArticleDetails id={id} />
		</div>
	);
};
export default memo(ArticleDetailPage);
