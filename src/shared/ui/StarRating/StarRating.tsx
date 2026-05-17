import React, { useState } from 'react';
import styles from './StarRating.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import StarIcon from '../../assets/icons/star.svg?react';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
	className?: string;
	size?: number;
	selectedStars?: number;
	onSelect?: (starsCount: number) => void;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: React.FC<StarRatingProps> = props => {
	const { className, size = 30, selectedStars = 0, onSelect } = props;
	const [curentStarCount, setCurrentStarCount] = useState(0);
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

	const onHover = (starsCount: number) => () => {
		if (!isSelected) {
			setCurrentStarCount(starsCount);
		}
	};

	const onLeave = () => {
		if (!isSelected) {
			setCurrentStarCount(0);
		}
	};

	const onClick = (starsCount: number) => () => {
		if (!isSelected) {
			onSelect?.(starsCount);
			setCurrentStarCount(starsCount);
			setIsSelected(true);
		}
	};

	return (
		<div className={classNames(styles.StarRating, {}, [className])}>
			{stars.map(starNumber => (
				<Icon
					className={classNames(styles.starIcon, { [styles.selected]: isSelected }, [
						curentStarCount >= starNumber ? styles.hovered : styles.normal
					])}
					Svg={StarIcon}
					key={starNumber}
					height={size}
					width={size}
					onMouseEnter={onHover(starNumber)}
					onMouseLeave={onLeave}
					onClick={onClick(starNumber)}
				/>
			))}
		</div>
	);
};
