import { Menu } from '@headlessui/react';
import styles from './DropDown.module.scss';
import { Button } from '../Button/Button';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

interface DropDownItem {
	href?: string;
	content?: ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

const DropDownMapper: Record<DropDownDirection, string> = {
	'bottom left': styles.optionsBottomLeft,
	'bottom right': styles.optionsBottomRight,
	'top left': styles.optionsTopLeft,
	'top right': styles.optionsTopRight
};

interface DropDownProps {
	items: DropDownItem[];
	trigger: ReactNode;
	direction?: DropDownDirection;
	className?: string;
}

export default function Dropdown(props: DropDownProps) {
	const { className, items, trigger, direction = 'bottom left' } = props;

	return (
		<Menu as={'div'} className={classNames(styles.DropDown, {}, [className])}>
			<Menu.Button className={styles.btn}>{trigger}</Menu.Button>

			<Menu.Items className={classNames(styles.items, {}, [DropDownMapper[direction]])}>
				{items.map((item, index) => {
					const content = ({ active }: { active: boolean }) => (
						<button
							key={index}
							disabled={item.disabled}
							type='button'
							onClick={item.onClick}
							className={classNames(styles.item, { [styles.active]: active }, [])}
						>
							{item.content}
						</button>
					);

					if (item.href) {
						return (
							<Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
								{content}
							</Menu.Item>
						);
					}

					return (
						<Menu.Item as={Fragment} disabled={item.disabled}>
							{content}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
}
