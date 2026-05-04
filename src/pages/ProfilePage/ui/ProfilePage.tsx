import React from 'react';

import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { EditableProfileCardHeader } from '@/features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();

	if (!id) {
		return <Text text={t('an error occurred')} />;
	}

	return (
		<Page>
			<VStack gap='8' max>
				<EditableProfileCard id={id} />
			</VStack>
		</Page>
	);
};
export default ProfilePage;
