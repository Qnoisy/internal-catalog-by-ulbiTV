import { MutableRefObject, useEffect, useRef } from 'react';

interface infiniteScrollProps {
	callback?: () => void;
	triggerRef: MutableRefObject<HTMLElement>;
	wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = ({ triggerRef, wrapperRef, callback }: infiniteScrollProps) => {
	useEffect(() => {
		let observer: IntersectionObserver | null = null;
		const wrapperElement = wrapperRef.current;
		const triggerElement = triggerRef.current;

		if (callback) {
			const options = {
				root: wrapperElement,
				rootMargin: '0px',
				scrollMargin: '0px',
				threshold: 1.0
			};

			observer = new IntersectionObserver(([entries]) => {
				if (entries.isIntersecting) {
					callback();
				}
			}, options);

			observer.observe(triggerElement);
			return () => {
				if (observer) {
					observer.unobserve(triggerElement);
				}
			};
		}
	}, [wrapperRef, triggerRef]);
};
