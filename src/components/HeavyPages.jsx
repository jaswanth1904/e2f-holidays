import { lazy } from 'react';

export const PackageDetails = lazy(() => import('./PackageDetails'));
export const Legal = lazy(() => import('./Legal'));
export const NotFound = lazy(() => import('./NotFound'));

export default { PackageDetails, Legal, NotFound };
