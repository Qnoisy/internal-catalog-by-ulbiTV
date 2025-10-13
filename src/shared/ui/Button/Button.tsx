import { ButtonHTMLAttributes, FC, memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ButtonTheme {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	OUTLINE_RED = 'outlineRed',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
	disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo(props => {
	const {
		className,
		children,
		theme = ButtonTheme.OUTLINE,
		square,
		size = ButtonSize.M,
		disabled,
		...otherProps
	} = props;

	const mods: Mods = {
		[styles.square]: square,
		[styles.disabled]: disabled
	};

	return (
		<button
			type='button'
			className={classNames(styles.Button, mods, [className, styles[theme], styles[size]])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
