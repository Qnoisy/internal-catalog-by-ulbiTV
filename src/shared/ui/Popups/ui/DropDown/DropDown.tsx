import { Menu } from '@headlessui/react';
import styles from './DropDown.module.scss';

import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { mapDirectionClass } from '../../styles/const';
import popupCls from '../../styles/popup.module.scss';

interface DropDownItem {
	id: string;
	href?: string;
	content?: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

interface DropDownProps {
	items: DropDownItem[];
	trigger: ReactNode;
	direction?: DropDownDirection;
	className?: string;
}

export default function Dropdown(props: DropDownProps) {
	const { className, items, trigger, direction = 'bottom left' } = props;

	return (
		<Menu as={'div'} className={classNames(styles.DropDown, {}, [className, popupCls.popup])}>
			<Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>

			<Menu.Items className={classNames(styles.items, {}, [mapDirectionClass[direction]])}>
				{items.map(item => {
					const content = ({ active }: { active: boolean }) => (
						<button
							disabled={item.disabled}
							type='button'
							onClick={item.onClick}
							className={classNames(styles.item, { [popupCls.active]: active }, [])}
						>
							{item.content}
						</button>
					);

					if (item.href) {
						return (
							<Menu.Item key={item.id} as={AppLink} to={item.href} disabled={item.disabled}>
								{content}
							</Menu.Item>
						);
					}

					return (
						<Menu.Item key={item.id} as={Fragment} disabled={item.disabled}>
							{content}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
}
