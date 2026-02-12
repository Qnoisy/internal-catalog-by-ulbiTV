import { Country } from 'entities/Country/model/types/country';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { MyListbox } from 'shared/ui/ListBox/ListBox';
import { Select } from 'shared/ui/Select/Select';

interface CountrySelectProps {
	readOnly?: boolean;
	className?: string;
	value?: Country;
	onChange?: (value: Country) => void;
}

const options = [
	{ value: Country.Armenia, content: Country.Armenia },
	{ value: Country.Ukraine, content: Country.Ukraine },
	{ value: Country.Rusia, content: Country.Rusia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan }
];

export const CountrySelect: React.FC<CountrySelectProps> = ({
	className,
	readOnly,
	value,
	onChange
}) => {
	const { t } = useTranslation();

	const onChangeCountry = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange]
	);

	return (
		<MyListbox
			value={value}
			className={classNames('', {}, [className])}
			onChange={onChangeCountry}
			items={options}
			label={t('select country')}
			disabled={readOnly}
		></MyListbox>
	);

	// return (
	// 	<Select
	// 		value={value}
	// 		readonly={readOnly}

	// 		className={classNames('', {}, [className])}
	// 		onChange={onChangeCountry}
	// 		options={options}
	// 	></Select>
	// );
};
