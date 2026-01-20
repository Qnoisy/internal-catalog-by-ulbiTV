import React, { useMemo } from 'react';
import styles from './ArticleSortSelector.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types/types';

interface ArticleSortSelectorProps {
	className?: string;
	sort: ArticleSortField;
	onChangeSort: (newSort: ArticleSortField) => void;
	order: SortOrder;
	onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector: React.FC<ArticleSortSelectorProps> = ({
	className,
	sort,
	order,
	onChangeSort,
	onChangeOrder
}) => {
	const { t } = useTranslation();

	const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
		() => [
			{
				value: 'asc',
				content: t('ascending')
			},
			{
				value: 'desc',
				content: t('descending')
			}
		],
		[t]
	);
	const sortFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
		() => [
			{
				value: ArticleSortField.CREATED,
				content: t('created')
			},
			{
				value: ArticleSortField.TITLE,
				content: t('title')
			},
			{
				value: ArticleSortField.VIEWS,
				content: t('views')
			}
		],
		[t]
	);

	return (
		<div className={classNames(styles.ArticleSortSelector, {}, [className])}>
			<Select
				options={sortFieldOptions}
				label={t('sort by')}
				value={sort}
				onChange={onChangeSort}
			/>
			<Select options={orderOptions} label={t('by')} value={order} onChange={onChangeOrder} />
		</div>
	);
};
