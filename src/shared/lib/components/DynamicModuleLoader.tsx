import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/stateSchema';
import React, { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: React.FC<DynamicModuleLoaderProps> = props => {
	const { children, reducers, removeAfterUnmount = true } = props;
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			store.reducerManager.add(name as StateSchemaKey, reducer);
		});
		dispatch({ type: '@INIT' });
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]) => {
					store.reducerManager.remove(name as StateSchemaKey);
				});
			}
		};
	}, []);

	return <>{children}</>;
};
