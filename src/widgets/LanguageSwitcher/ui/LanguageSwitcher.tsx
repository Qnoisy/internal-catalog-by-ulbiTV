import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = memo(
	({ className, short = true }) => {
		const { t, i18n } = useTranslation();
		const toggle = () => {
			i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
		};
		return (
			<Button
				theme={ButtonTheme.CLEAR}
				className={classNames(styles.ThemeSwitcher, {}, [className])}
				onClick={toggle}
			>
				{short ? t('shortLang') : t('language')}
			</Button>
		);
	}
);
