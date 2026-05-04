import { ReactNode } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import styles from './Popover.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import popupCls from '../../styles/popup.module.scss';
import { mapDirectionClass } from '../../styles/const';

interface PopoverProps {
	className?: string;
	direction?: DropDownDirection;
	trigger: ReactNode;
	children: ReactNode;
}

export function Popover(props: PopoverProps) {
	const { trigger, className, direction = 'bottom right', children } = props;

	const mapDirection = [mapDirectionClass[direction]];

	return (
		<HPopover className={classNames(styles.Popover, {}, [className, popupCls.popup])}>
			<HPopover.Button className={popupCls.trigger}>{trigger}</HPopover.Button>
			<HPopover.Panel className={classNames(styles.panel, {}, mapDirection)}>
				{children}
			</HPopover.Panel>
		</HPopover>
	);
}
