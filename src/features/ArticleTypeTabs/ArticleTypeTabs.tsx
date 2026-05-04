import React, { useCallback, useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';

import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article/model/const/const';

interface ArticleTypeTabsProps {
	className?: string;
	value: ArticleType;
	onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: React.FC<ArticleTypeTabsProps> = props => {
	const { value, onChangeType, className } = props;
	const { t } = useTranslation();
	const typeTabs = useMemo<TabItem<ArticleType>[]>(
		() => [
			{
				value: ArticleType.ALL,
				content: t('all')
			},
			{
				value: ArticleType.IT,
				content: t('it')
			},
			{
				value: ArticleType.SCIENCE,
				content: t('science')
			},
			{
				value: ArticleType.ECONOMICS,
				content: t('economics')
			}
		],
		[]
	);

	const onTabClick = useCallback(
		(tab: TabItem<ArticleType>) => {
			onChangeType(tab.value);
		},
		[onChangeType]
	);

	return <Tabs className={className} tabs={typeTabs} value={value} onTabClick={onTabClick}></Tabs>;
};
