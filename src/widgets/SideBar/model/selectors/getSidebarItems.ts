import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg?react';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg?react';
import MainIcon from '@/shared/assets/icons/main-20-20.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg?react';

import { SideBarItemType } from '../types/sidebar';
import {
	getRouteAbout,
	getRouteArticles,
	getRouteMain,
	getRouteProfile
} from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, userData => {
	const sideBarItemsList: SideBarItemType[] = [
		{
			path: getRouteAbout(),
			Icon: AboutIcon,
			text: 'about'
		},
		{
			path: getRouteMain(),
			Icon: MainIcon,
			text: 'main'
		}
	];
	if (userData) {
		sideBarItemsList.push(
			{
				path: getRouteProfile(userData.id),
				Icon: ProfileIcon,
				text: 'profile',
				authOnly: true
			},
			{
				path: getRouteArticles(),
				Icon: ArticleIcon,
				text: 'articles',
				authOnly: true
			}
		);
	}
	return sideBarItemsList;
});
