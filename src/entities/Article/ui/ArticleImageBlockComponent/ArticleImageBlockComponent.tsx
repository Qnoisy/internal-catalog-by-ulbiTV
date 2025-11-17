import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/article';
import styles from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
	className?: string;
	block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: React.FC<ArticleImageBlockComponentProps> = ({
	className,
	block
}) => {
	return (
		<div className={classNames(styles.ArticleImageBlockComponent, {}, [className])}>
			<img className={styles.img} src={block.src} alt={block.title} />
			{block.title && <Text text={block.title} align={TextAlign.CENTER} />}
		</div>
	);
};
