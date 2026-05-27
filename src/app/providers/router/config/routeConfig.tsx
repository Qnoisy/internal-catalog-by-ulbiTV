import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { UserRole } from '@/entities/User';
import { RouteProps } from 'react-router-dom';
import { ProfilePage } from '@/pages/ProfilePage';
import ArticlesPage from '@/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetaildsPage/ui/ArticleDetailPage/ArticleDetailPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
	AppRoutes,
	getRouteAbout,
	getRouteAdminPanel,
	getRouteArticleCreate,
	getRouteArticleDetails,
	getRouteArticleEdit,
	getRouteArticles,
	getRouteForbiden,
	getRouteMain,
	getRouteProfile
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />
	},
	[AppRoutes.ABOUT]: {
		path: getRouteAbout(),
		element: <AboutPage />
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(':id'),
		element: <ProfilePage />,
		authOnly: true
	},
	[AppRoutes.ARTICLES]: {
		path: getRouteArticles(),
		element: <ArticlesPage />,
		authOnly: true
	},
	[AppRoutes.ARTICLE_DETAILS]: {
		path: getRouteArticleDetails(':id'),
		element: <ArticleDetailPage />,
		authOnly: true
	},
	[AppRoutes.ARTICLE_EDIT]: {
		path: getRouteArticleCreate(),
		element: <ArticleEditPage />,
		authOnly: true
	},
	[AppRoutes.ARTICLE_CREATE]: {
		path: getRouteArticleEdit(':id'),
		element: <ArticleEditPage />,
		authOnly: true
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: getRouteAdminPanel(),
		element: <AdminPanelPage />,
		authOnly: true,
		roles: [UserRole.ADMIN, UserRole.MANAGER]
	},

	// last
	[AppRoutes.FORBBIDEN]: {
		path: getRouteForbiden(),
		element: <ForbiddenPage />
	},
	[AppRoutes.NOT_FOUND]: {
		path: '*',
		element: <NotFoundPage />
	}
};
