import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
	autofocus?: boolean;
}

export const Input: React.FC<InputProps> = memo(props => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autoFocus = false,
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);
	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};

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
					className={classNames(styles.Input, {}, [className])}
					onSelect={onSelect}
					{...otherProps}
				/>
				{isFocused && (
					<span style={{ left: `${caretPosition * 9}px` }} className={styles.caret}></span>
				)}
			</div>
		</div>
	);
});
