import { ArticleView } from 'entities/Article/model/types/article';
import React from 'react';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import styles from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		Icon: TiledIcon
	},
	{
		view: ArticleView.BIG,
		Icon: ListIcon
	}
];

export const ArticleViewSelector: React.FC<ArticleViewSelectorProps> = ({
	className,
	view,
	onViewClick
}) => {
	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<div className={classNames(styles.ArticleViewSelector, {}, [className])}>
			{viewTypes.map(elem => (
				<Button key={elem.view} onClick={onClick(elem.view)} theme={ButtonTheme.CLEAR}>
					<Icon
						Svg={elem.Icon}
						className={classNames('', { [styles.notSelected]: elem.view !== view }, [])}
					/>
				</Button>
			))}
		</div>
	);
};
