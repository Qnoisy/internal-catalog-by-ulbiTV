import React, { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './Select.module.scss';

export interface SelectOptions {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	options?: SelectOptions[];
	value?: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
}

export const Select: React.FC<SelectProps> = memo(props => {
	const { className, label, options, value, onChange, readonly } = props;
	const mods: Mods = {};

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value);
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
});
