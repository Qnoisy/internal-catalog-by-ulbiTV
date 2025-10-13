import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readonly'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
}

export const Input: React.FC<InputProps> = memo(props => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autoFocus = false,
		readonly = false,
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};

	const isCarretVisible = isFocused && !readonly;

	useEffect(() => {
		if (autoFocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autoFocus]);

	const onBlur = () => {
		setIsFocused(false);
	};
	const onFocus = () => {
		setIsFocused(true);
	};
	const onSelect = (e: any) => {
		setCaretPosition(e?.target?.selectionStart || 0);
	};

	const mods: Mods = {
		[styles.readonly]: readonly
	};

	return (
		<div className={classNames(styles.InputWrapper, {}, [className])}>
			{placeholder && <div className={styles.placeholder}>{`${placeholder}>`}</div>}
			<div className={styles.caretWrapper}>
				<input
					ref={ref}
					onBlur={onBlur}
					onFocus={onFocus}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={classNames(styles.Input, mods, [])}
					onSelect={onSelect}
					readOnly={readonly}
					{...otherProps}
				/>
				{isCarretVisible && (
					<span style={{ left: `${caretPosition * 9}px` }} className={styles.caret}></span>
				)}
			</div>
		</div>
	);
});
