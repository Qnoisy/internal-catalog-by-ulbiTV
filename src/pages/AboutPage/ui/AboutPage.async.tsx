import { lazy } from 'react';
console.log(1);

export const AboutPageAsync = lazy(() => import('./AboutPage'));
