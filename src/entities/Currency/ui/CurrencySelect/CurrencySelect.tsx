import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
	className?: string;
	value?: Currency;
	onChange?: (value: Currency) => void;
	readOnly?: boolean;
}

const options = [
	{ value: Currency.RUB, content: Currency.RUB },
	{ value: Currency.EUR, content: Currency.EUR },
	{ value: Currency.UAN, content: Currency.UAN },
	{ value: Currency.USD, content: Currency.USD }
];

export const CurrencySelect: React.FC<CurrencySelectProps> = memo(
	({ className, value, onChange, readOnly }) => {
		const { t } = useTranslation();

		const onChangeCurrency = useCallback(
			(value: string) => {
				onChange?.(value as Currency);
			},
			[onChange]
		);

		return (
			<Select
				readonly={readOnly}
				value={value}
				onChange={onChangeCurrency}
				label={t('select currency')}
				className={classNames('', {}, [className])}
				options={options}
			></Select>
		);
	}
);
