import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import User from '@/shared/assets/icons/profile.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
	fallbackInverted?: boolean;
}

export const Avatar = ({ className, src, size = 100, alt, fallbackInverted }: AvatarProps) => {
	const mods: Mods = {};

	const styles = useMemo<CSSProperties>(
		() => ({
			width: size,
			height: size
		}),
		[size]
	);

	const fallback = <Skeleton width={size} height={size} border='50%' />;
	const errorFallback = <img src={User} width={size} height={size} alt='user' />;

	return (
		<div className={classNames(cls.Avatar, {}, [className])} style={styles}>
			<AppImage fallback={fallback} errorFallback={errorFallback} src={src} alt={alt} />
		</div>
	);
};
