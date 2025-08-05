import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
	className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	className,
}) => {
	const { t, i18n } = useTranslation();
	const toggle = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};
	return (
		<Button
			theme={ThemeButton.CLEAR}
			className={classNames(styles.ThemeSwitcher, {}, [className])}
			onClick={toggle}
		>
			{t('language')}
		</Button>
	);
};
