import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
	className?: string;
}

export const ArticleTextBlockComponent: React.FC<ArticleTextBlockComponentProps> = ({
	className
}) => {
	return <div className={classNames(styles.ArticleTextBlockComponent, {}, [className])}></div>;
};
