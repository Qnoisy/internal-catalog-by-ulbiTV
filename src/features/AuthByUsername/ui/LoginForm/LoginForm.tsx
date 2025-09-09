import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
	className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
	const [value, setValue] = useState('');
	const onChangeHandler = (value: string) => {
		setValue(value);
	};
	const { t } = useTranslation();
	return (
		<div className={classNames(styles.LoginForm, {}, [className])}>
			<Input
				placeholder={t('Enter username')}
				onChange={onChangeHandler}
				type='text'
				className={styles.input}
				autoFocus={true}
			/>
			<Input placeholder={t('Enter password')} type='text' className={styles.input} />
			<Button className={styles.loginBtn}>{t('LogIn')}</Button>
		</div>
	);
};
