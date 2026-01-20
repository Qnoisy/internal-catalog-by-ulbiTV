import React, { ReactNode, useCallback } from 'react';
import styles from './Tabs.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
	value: T;
	content: ReactNode;
}

interface TabsProps<T extends string> {
	className?: string;
	tabs: TabItem<T>[];
	value: T;
	onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
	const { className, tabs, value, onTabClick } = props;

	const clickHandle = useCallback((tab: TabItem<T>) => {
		return () => onTabClick(tab);
	}, []);

	return (
		<div className={classNames(styles.Tabs, {}, [className])}>
			{tabs.map(tab => (
				<Card
					theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
					onClick={clickHandle(tab)}
					key={tab.value}
					className={styles.Tab}
				>
					{tab.content}
				</Card>
			))}
		</div>
	);
};
