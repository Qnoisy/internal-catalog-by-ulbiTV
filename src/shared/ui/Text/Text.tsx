import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
	INVERTED = 'inverted'
}
export enum TextAlign {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right'
}
export enum TextSize {
	L = 'size_l',
	M = 'size_m'
}

interface TextProps {
	className?: string;
	title?: string;
	text?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M
	} = props;

	return (
		<div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});
