import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
	Spring?: SpringType;
	Gesture?: GestureType;
	isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

export const useAnimationLibs = () => {
	return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

const getAsynqAnimationModules = async () => {
	return await Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
	const SpringRef = useRef<SpringType>();
	const GestureRef = useRef<GestureType>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getAsynqAnimationModules().then(([Spring, Gesture]) => {
			SpringRef.current = Spring;
			GestureRef.current = Gesture;
			setIsLoading(true);
		});
	}, [isLoading]);

	const value = useMemo(
		() => ({
			Spring: SpringRef.current,
			Gesture: GestureRef.current,
			isLoaded: isLoading
		}),
		[isLoading]
	);

	return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};
