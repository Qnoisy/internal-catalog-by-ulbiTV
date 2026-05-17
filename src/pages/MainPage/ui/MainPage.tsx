import { BugButton } from '@/app/providers/ErrorBoundary';
import { Counter } from '@/entities/Counter';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

import { RatingCard } from '@/entities/Rating';

const MainPage = memo(() => {
	const { t } = useTranslation();
	return (
		<Page>
			{t('main page')}
			<BugButton />
			<RatingCard title={t('titleArticle')} feedbackTitle={t('revievArticle')} hasFeedBack={true} />
		</Page>
	);
});

export default MainPage;
