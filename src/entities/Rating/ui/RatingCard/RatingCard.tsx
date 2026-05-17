import React, { useCallback, useState } from 'react';
import styles from './RatingCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
	className?: string;
	title: string;
	feedbackTitle?: string;
	hasFeedBack?: boolean;
	onCancel?: (starsCount: number) => void;
	onAccept?: (starsCount: number, feedBack?: string) => void;
}

export const RatingCard: React.FC<RatingCardProps> = props => {
	const { className, title, feedbackTitle, hasFeedBack, onCancel, onAccept } = props;

	const { t } = useTranslation();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [starsCount, setStarsCount] = useState(0);
	const [feedBack, setfeedBack] = useState('');

	const onSelectStars = useCallback(
		(selectedStars: number) => {
			setStarsCount(selectedStars);
			if (hasFeedBack) {
				setIsModalOpen(true);
			} else {
				onAccept?.(selectedStars);
			}
		},
		[hasFeedBack, onAccept]
	);

	const handlerAccept = useCallback(() => {
		setIsModalOpen(false);
		onAccept?.(starsCount, feedBack);
	}, [feedBack, starsCount, onAccept]);

	const handlerCancel = useCallback(() => {
		setIsModalOpen(false);
		onCancel?.(starsCount);
	}, [onCancel, starsCount]);

	const modalContent = (
		<>
			<Text text={feedbackTitle} />
			<Input value={feedBack} onChange={setfeedBack} placeholder={t('Your review')} />
		</>
	);

	return (
		<Card className={classNames(styles.RatingCard, {}, [className])}>
			<VStack align='center' gap='8'>
				<Text title={title} />
				<StarRating size={40} onSelect={onSelectStars} />
			</VStack>
			<BrowserView>
				<Modal isOpen={isModalOpen} lazy>
					<VStack max gap='32'>
						{modalContent}
						<HStack max gap='16' justify='end'>
							<Button onClick={handlerCancel} theme={ButtonTheme.OUTLINE_RED}>
								{t('close')}
							</Button>
							<Button onClick={handlerAccept} theme={ButtonTheme.OUTLINE}>
								{t('send')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</BrowserView>
			<MobileView>
				<Drawer isOpen={isModalOpen} lazy onClose={handlerCancel}>
					<VStack gap='32'>
						{modalContent}
						<Button
							fullWidth
							onClick={handlerAccept}
							theme={ButtonTheme.OUTLINE}
							size={ButtonSize.L}
						>
							{t('send')}
						</Button>
					</VStack>
				</Drawer>
			</MobileView>
		</Card>
	);
};
