declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare const __API__: string;
declare const __IS_DEV__: boolean;
declare const __PROJECT__: 'jest' | 'frontend';

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

type OptionalRecord<K extends keyof any, T> = {
	[P in K]?: T;
};
