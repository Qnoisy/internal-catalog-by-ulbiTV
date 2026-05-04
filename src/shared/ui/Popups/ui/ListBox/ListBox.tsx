import { Listbox } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import cls from './ListBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import { Button } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import { mapDirectionClass } from '../../styles/const';
import popupCls from '../../styles/popup.module.scss';

interface ListBoxItems {
	value: string;
	content: ReactNode;
}

interface ListBoxProps {
	items: ListBoxItems[];
	onChange: (value: string) => void;
	direction?: DropDownDirection;
	className?: string;
	value?: string;
	defaultValue?: string;
	label?: string;
	disabled?: boolean;
}

export function MyListbox(props: ListBoxProps) {
	const {
		direction = 'bottom left',
		items,
		className,
		value,
		defaultValue,
		onChange,
		label,
		disabled
	} = props;

	const clsDirection = [mapDirectionClass[direction], cls.options];

	return (
		<HStack
			align='center'
			gap='8'
			className={classNames(cls.ListBoks, {}, [className, popupCls.popup])}
		>
			<label className={cls.label}>{`${label}>`}</label>

			<Listbox as={'div'} className={cls.wrapper} value={value} onChange={onChange}>
				<Listbox.Button className={cls.trigger}>
					<Button disabled={disabled} className={cls.btn}>
						{value ?? defaultValue}
					</Button>
				</Listbox.Button>

				<Listbox.Options className={classNames('', {}, clsDirection)}>
					{items.map(item => (
						<Listbox.Option
							disabled={disabled}
							className={cls.option}
							key={item.value}
							value={item.value}
						>
							{({ active, selected }) => (
								<li
									className={classNames(
										'',
										{ [popupCls.active]: active, [popupCls.disabled]: disabled },
										[cls.item]
									)}
								>
									{item.value}
									{selected && '>'}
								</li>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
		</HStack>
	);
}
