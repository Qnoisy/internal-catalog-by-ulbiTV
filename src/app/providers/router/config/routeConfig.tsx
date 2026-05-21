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
import { AppRoutes, RoutePath } from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <AboutPage />
	},
	[AppRoutes.PROFILE]: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true
	},
	[AppRoutes.ARTICLES]: {
		path: RoutePath.articles,
		element: <ArticlesPage />,
		authOnly: true
	},
	[AppRoutes.ARTICLE_DETAILS]: {
		path: `${RoutePath.article_details}:id`,
		element: <ArticleDetailPage />,
		authOnly: true
	},
	[AppRoutes.ARTICLE_EDIT]: {
		path: `${RoutePath.article_edit}`,
		element: <ArticleEditPage />,
		authOnly: true
	},
	[AppRoutes.ARTICLE_CREATE]: {
		path: `${RoutePath.article_create}`,
		element: <ArticleEditPage />,
		authOnly: true
	},
	[AppRoutes.ADMIN_PANEL]: {
		path: RoutePath.admin_panel,
		element: <AdminPanelPage />,
		authOnly: true,
		roles: [UserRole.ADMIN, UserRole.MANAGER]
	},

	// last
	[AppRoutes.FORBBIDEN]: {
		path: RoutePath.forbbiden,
		element: <ForbiddenPage />
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />
	}
};
