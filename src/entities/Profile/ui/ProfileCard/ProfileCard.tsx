import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Profile } from '../../model/types/profile';
import styles from './ProfileCard.module.scss';
import { HStack, VStack } from 'shared/ui/Stack';

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
	onChangeCurrency?: (currency?: Currency) => void;
	onChangeCountry?: (country?: Country) => void;
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
		onChangeAvatar,
		onChangeCurrency,
		onChangeCountry
	} = props;

	if (isLoading)
		return (
			<HStack
				justify='center'
				className={classNames(styles.ProfileCard, {}, [className, styles.loading])}
			>
				<Loader />
			</HStack>
		);
	if (error)
		return (
			<HStack
				justify='center'
				className={classNames(styles.ProfileCard, {}, [className, styles.error])}
			>
				<Text theme={TextTheme.ERROR} title='error' align={TextAlign.CENTER} />
			</HStack>
		);

	const mods: Mods = {
		[styles.editing]: !readonly
	};

	return (
		<VStack gap='16' max className={classNames(styles.ProfileCard, mods, [className])}>
			{data?.avatar && (
				<HStack justify='center' max>
					<Avatar src={data?.avatar} alt='' />
				</HStack>
			)}
			<Input
				value={data?.first}
				placeholder={t('your firstname')}
				onChange={onChangeFirstname}
				readOnly={readonly}
			/>
			<Input
				value={data?.lastname}
				placeholder={t('your lastname')}
				onChange={onChangeLastname}
				readOnly={readonly}
			/>
			<Input
				value={data?.age}
				placeholder={t('your age')}
				onChange={onChangeAge}
				readOnly={readonly}
			/>
			<Input
				value={data?.city}
				placeholder={t('city')}
				onChange={onChangeCity}
				readOnly={readonly}
			/>
			<Input
				value={data?.username}
				placeholder={t('enter username')}
				onChange={onChangeUserName}
				readOnly={readonly}
			/>
			<Input
				value={data?.avatar}
				placeholder={t('enter link to avatar')}
				onChange={onChangeAvatar}
				readOnly={readonly}
			/>
			<CurrencySelect value={data?.currency} onChange={onChangeCurrency} readOnly={readonly} />
			<CountrySelect value={data?.country} onChange={onChangeCountry} readOnly={readonly} />
		</VStack>
	);
};
