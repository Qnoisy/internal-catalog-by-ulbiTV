import React, { Children, MutableRefObject, ReactNode, UIEvent, useEffect, useRef } from 'react';
import styles from './Page.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ScrolSaveActions } from 'features/ScrollSave';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getScrollSave,
	getScrollSaveByPath
} from 'features/ScrollSave/model/selectors/getScrollSaveSelectors';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

interface PageProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const Page: React.FC<PageProps> = ({ className, children, onScrollEnd }) => {
	const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const scrollPosition = useSelector((state: StateSchema) => getScrollSaveByPath(state, pathname));

	useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		dispatch(
			ScrolSaveActions.setScrollPosition({ position: e.currentTarget.scrollTop, path: pathname })
		);
	}, 500);

	useEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	}, []);

	return (
		<section
			ref={wrapperRef}
			className={classNames(styles.Page, {}, [className])}
			onScroll={onScroll}
		>
			{children}
			{onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
		</section>
	);
};
