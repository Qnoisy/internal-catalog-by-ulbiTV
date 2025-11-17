import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from '../../assets/icons/copy-20-20.svg';
import { Button, ButtonTheme } from '../Button/Button';
import styles from './Code.module.scss';

interface CodeProps {
	className?: string;
	text: string;
}

export const Code: React.FC<CodeProps> = ({ className, text }) => {
	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
	}, []);

	return (
		<pre className={classNames(styles.Code, {}, [className])}>
			<Button onClick={onCopy} className={styles.copyBtn} theme={ButtonTheme.CLEAR}>
				<CopyIcon className={styles.copyIcon} />
			</Button>
			<code className=''>{text}</code>
		</pre>
	);
};
