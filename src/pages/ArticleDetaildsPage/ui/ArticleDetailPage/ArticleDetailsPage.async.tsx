import { lazy } from 'react';

export const ArticleDetailPageAsync = lazy(
	() =>
		new Promise(resolve => {
			// @ts-ignore
			// ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
			setTimeout(() => resolve(import('./ArticleDetailPage')), 1500);
		})
);
