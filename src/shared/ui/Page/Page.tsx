import React, { Children, MutableRefObject, ReactNode, useRef } from 'react';
import styles from './Page.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const Page: React.FC<PageProps> = ({ className, children, onScrollEnd }) => {
	const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

	return (
		<section ref={wrapperRef} className={classNames(styles.Page, {}, [className])}>
			{children}
			<div ref={triggerRef} />
		</section>
	);
};
