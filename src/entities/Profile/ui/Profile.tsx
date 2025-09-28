import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Profile.module.scss';

interface ProfileProps {
	className?: string;
}

export const Profile: React.FC<ProfileProps> = ({ className }) => {
	return <div className={classNames(styles.Profile, {}, [className])}></div>;
};
