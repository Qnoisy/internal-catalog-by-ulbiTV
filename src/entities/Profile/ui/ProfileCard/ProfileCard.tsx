import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Profile } from '../../model/types/profile';
import styles from './ProfileCard.module.scss';

interface ProfileProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUserName?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
}

export const ProfileCard: React.FC<ProfileProps> = props => {
	const { t } = useTranslation('profile');
	const {
		className,
		data,
		isLoading,
		error,
		readonly,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeCity,
		onChangeUserName,
		onChangeAvatar
	} = props;

	if (isLoading)
		return (
			<div className={classNames(styles.ProfileCard, {}, [className, styles.loading])}>
				<Loader />
			</div>
		);
	if (error)
		return (
			<div className={classNames(styles.ProfileCard, {}, [className, styles.error])}>
				<Text theme={TextTheme.ERROR} title='error' align={TextAlign.CENTER} />
			</div>
		);

	const mods: Mods = {
		[styles.editing]: !readonly
	};

	return (
		<div className={classNames(styles.ProfileCard, mods, [className])}>
			<div className={styles.header}></div>
			<div className={styles.data}>
				{data?.avatar && (
					<div className={styles.avatarWrapper}>
						<Avatar src={data?.avatar} alt='' />
					</div>
				)}
				<Input
					value={data?.first}
					placeholder={t('your firstname')}
					className={styles.input}
					onChange={onChangeFirstname}
					readOnly={readonly}
				/>
				<Input
					value={data?.lastname}
					placeholder={t('your lastname')}
					className={styles.input}
					onChange={onChangeLastname}
					readOnly={readonly}
				/>
				<Input
					value={data?.age}
					placeholder={t('your age')}
					className={styles.input}
					onChange={onChangeAge}
					readOnly={readonly}
				/>
				<Input
					value={data?.city}
					placeholder={t('city')}
					className={styles.input}
					onChange={onChangeCity}
					readOnly={readonly}
				/>
				<Input
					value={data?.username}
					placeholder={t('enter username')}
					className={styles.input}
					onChange={onChangeUserName}
					readOnly={readonly}
				/>
				<Input
					value={data?.avatar}
					placeholder={t('enter link to avatar')}
					className={styles.input}
					onChange={onChangeAvatar}
					readOnly={readonly}
				/>
			</div>
		</div>
	);
};
