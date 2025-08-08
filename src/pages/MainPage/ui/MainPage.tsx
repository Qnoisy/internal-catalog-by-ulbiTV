import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
	const { t } = useTranslation('main');
	return (
		<div>
			{t('main page')}
			<BugButton />
		</div>
	);
};

export default MainPage;
