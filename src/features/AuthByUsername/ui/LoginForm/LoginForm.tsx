import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/logitSlice';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import styles from './LoginForm.module.scss';

export interface LoginFormProps {
	className?: string;
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	login: loginReducer
};

const LoginForm: React.FC<LoginFormProps> = memo(({ className, onSuccess }) => {
	const dispatch = useAppDispatch();
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

	const onLoginClick = useCallback(async () => {
		const result = await dispatch(loginByUsername({ username, password }));
		if ((result.meta.requestStatus = 'fulfilled')) {
			onSuccess();
		}
	}, [dispatch, username, password]);

	const { t } = useTranslation();
	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<div className={classNames(styles.LoginForm, {}, [className])}>
				<Text title={t('Registration form')} />
				{error && (
					<Text text={t('You write uncorrect username or password')} theme={TextTheme.ERROR} />
				)}
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
