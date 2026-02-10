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
	S = 'size_s',
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

type HeaderTagType = 'h2' | 'h3' | 'h4';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
	[TextSize.S]: 'h4',
	[TextSize.L]: 'h3',
	[TextSize.M]: 'h2'
};

export const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M
	} = props;

	const HeaderTag = mapSizeToHeaderTag[size];

	return (
		<div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
			{title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});
