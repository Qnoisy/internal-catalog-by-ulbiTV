import { getCommentFormText } from 'features/AddCommentForm/model/selectors/addCommentFormSelectors';
import {
	addCommentFormActions,
	addCommentFormReducer
} from 'features/AddCommentForm/model/slice/AddCommentFormSlice';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
	className?: string;
	onSendComment: (test: string) => void;
}

const reducer: ReducersList = {
	addCommentForm: addCommentFormReducer
};

const AddCommentForm: React.FC<AddCommentFormProps> = ({ className, onSendComment }) => {
	const { t } = useTranslation();
	const text = useSelector(getCommentFormText);
	const dispatch = useAppDispatch();

	const onCommentTextChange = useCallback(
		(value: string) => {
			dispatch(addCommentFormActions.setComment(value));
		},
		[dispatch]
	);

	const onSendHandler = useCallback(() => {
		onSendComment(text || '');
		onCommentTextChange('');
	}, [onSendComment, text, onCommentTextChange]);

	return (
		<DynamicModuleLoader reducers={reducer}>
			<div className={classNames(styles.AddCommentForm, {}, [className])}>
				<Input
					className={styles.input}
					value={text}
					placeholder={t('enter comment')}
					onChange={onCommentTextChange}
				/>
				<Button onClick={onSendHandler}>{t('send')}</Button>
			</div>
		</DynamicModuleLoader>
	);
};
export default AddCommentForm;
