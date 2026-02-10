import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import styles from './Flex.module.scss';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

type FlexJustify = 'start' | 'center' | 'end' | 'between';
type FlexAlign = 'start' | 'center' | 'end';
type FlexDirection = 'row' | 'column';
type FlexGap = '4' | '8' | '16' | '32';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
	className?: string;
	children: ReactNode;
	justify?: FlexJustify;
	align?: FlexAlign;
	direction?: FlexDirection;
	gap?: FlexGap;
	max?: boolean;
}

const GapClasses: Record<FlexGap, string> = {
	4: styles.gap4,
	8: styles.gap8,
	16: styles.gap16,
	32: styles.gap32
};

const JustifyClasses: Record<FlexJustify, string> = {
	start: styles.justifyStart,
	center: styles.justifyCenter,
	end: styles.justifyEnd,
	between: styles.justifyBetween
};
const AlignClasses: Record<FlexAlign, string> = {
	start: styles.alignStart,
	center: styles.alignCenter,
	end: styles.alignEnd
};
const DirectionClasses: Record<FlexDirection, string> = {
	column: styles.directionColumn,
	row: styles.directionRow
};

export const Flex: React.FC<FlexProps> = ({
	className,
	children,
	justify = 'start',
	align = 'start',
	direction = 'row',
	gap = '8',
	max
}) => {
	const mods: Mods = {
		[styles.max]: max
	};

	return (
		<div
			className={classNames(styles.Flex, mods, [
				className,
				JustifyClasses[justify],
				AlignClasses[align],
				DirectionClasses[direction],
				gap && GapClasses[gap]
			])}
		>
			{children}
		</div>
	);
};
