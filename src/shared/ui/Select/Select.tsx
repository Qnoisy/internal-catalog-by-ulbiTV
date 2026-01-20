import React, { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './Select.module.scss';

export interface SelectOptions<T extends string> {
	value: T;
	content: string;
}

interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	options?: SelectOptions<T>[];
	value?: T;
	onChange?: (value: T) => void;
	readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
	const { className, label, options, value, onChange, readonly } = props;
	const mods: Mods = {};

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value as T);
	};

	const optionList = useMemo(() => {
		return options?.map(opt => (
			<option className={styles.option} value={opt.value} key={opt.value}>
				{opt.content}
			</option>
		));
	}, [options]);

	return (
		<div className={classNames(styles.Wrapper, mods, [className])}>
			{label && <span className={styles.label}>{`${label}>`}</span>}
			<select
				disabled={readonly}
				value={value}
				onChange={onChangeHandler}
				className={styles.select}
			>
				{optionList}
			</select>
		</div>
	);
};
