import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SideBarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, userData => {
	const sideBarItemsList: SideBarItemType[] = [
		{
			path: RoutePath.about,
			Icon: AboutIcon,
			text: 'about'
		},
		{
			path: RoutePath.main,
			Icon: MainIcon,
			text: 'main'
		}
	];
	if (userData) {
		sideBarItemsList.push(
			{
				path: RoutePath.profile + userData.id,
				Icon: ProfileIcon,
				text: 'profile',
				authOnly: true
			},
			{
				path: RoutePath.articles,
				Icon: ArticleIcon,
				text: 'articles',
				authOnly: true
			}
		);
	}
	return sideBarItemsList;
});
