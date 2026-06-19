import React, { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	fallback?: ReactElement;
	errorFallback?: ReactElement;
}

export const AppImage: React.FC<AppImageProps> = memo(props => {
	const { className, src, alt = 'image', fallback, errorFallback, ...otherProps } = props;
	useLayoutEffect(() => {
		setIsLoading(true);
		setHasError(false);

		const img = new Image();
		img.src = src ?? '';

		img.onload = () => setIsLoading(false);
		img.onerror = () => {
			setHasError(true);
			setIsLoading(false);
		};
	}, [src]);

	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	if (isLoading && fallback) {
		return fallback;
	}

	if (hasError && errorFallback) {
		return errorFallback;
	}

	return <img className={className} src={src} alt={alt} {...otherProps} />;
});
