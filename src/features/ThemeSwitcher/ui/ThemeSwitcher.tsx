import React, { memo } from 'react';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg?react';
import LightIcon from '@/shared/assets/icons/theme-light.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import styles from './ThemeSwitcher.module.scss';
import { Theme } from '@/shared/const/theme';
import useTheme from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = memo(({ className }) => {
	const { theme, toggleTheme } = useTheme();
	return (
		<Button
			theme={ButtonTheme.CLEAR}
			className={classNames(styles.ThemeSwitcher, {}, [className])}
			onClick={toggleTheme}
		>
			{theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
		</Button>
	);
});
