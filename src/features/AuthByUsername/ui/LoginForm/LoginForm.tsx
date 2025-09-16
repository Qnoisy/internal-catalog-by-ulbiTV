import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/logitSlice';
import { loginByUsername } from 'features/AuthByUsername/services/loginByUsername/loginByUsername';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
	className?: string;
}

const initialReducers: ReducerList = {
	login: loginReducer
};

const LoginForm: React.FC<LoginFormProps> = memo(({ className }) => {
	const dispatch = useDispatch();
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);

	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch]
	);

	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ username, password }));
	}, [dispatch, username, password]);

	const { t } = useTranslation();
	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<div className={classNames(styles.LoginForm, {}, [className])}>
				<Text title={t('Форма авторизации')} />
				{error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
				<Input
					placeholder={t('Enter username')}
					type='text'
					className={styles.input}
					autoFocus={true}
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					placeholder={t('Enter password')}
					type='text'
					className={styles.input}
					onChange={onChangePassword}
					value={password}
				/>
				<Button onClick={onLoginClick} disabled={isLoading} className={styles.loginBtn}>
					{t('LogIn')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
