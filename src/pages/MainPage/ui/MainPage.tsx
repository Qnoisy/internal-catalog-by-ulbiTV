import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'shared/ui/DropDown/DropDown';
import { MyListbox } from 'shared/ui/ListBox/ListBox';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
	const { t } = useTranslation();
	return (
		<Page>
			{t('main page')}
			<BugButton />
		</Page>
	);
});

export default MainPage;
