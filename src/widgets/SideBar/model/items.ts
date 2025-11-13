import { SVGProps, VFC } from 'react';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
export interface SideBarItemTyoe {
	path: string;
	text: string;
	Icon: VFC<SVGProps<SVGSVGElement>>;
	authOnly?: boolean;
}

export const SideBarItemsList: SideBarItemTyoe[] = [
	{
		path: RoutePath.about,
		Icon: AboutIcon,
		text: 'about'
	},
	{
		path: RoutePath.main,
		Icon: MainIcon,
		text: 'main'
	},
	{
		path: RoutePath.profile,
		Icon: ProfileIcon,
		text: 'profile',
		authOnly: true
	},
	{
		path: RoutePath.articles,
		Icon: ProfileIcon,
		text: 'articles',
		authOnly: true
	}
];
