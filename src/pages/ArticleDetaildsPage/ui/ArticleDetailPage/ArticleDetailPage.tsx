import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticleDetailPage.module.scss';

interface ArticleDetailPageProps {
	className?: string;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ className }) => {
	return <div className={classNames(styles.ArticleDetailPage, {}, [className])}>text</div>;
};
export default memo(ArticleDetailPage);
