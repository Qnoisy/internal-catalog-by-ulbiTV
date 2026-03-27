import { DeepPartial, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { createReduxStore, StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/stateSchema';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface componentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<
		{
			[key in StateSchemaKey]: Reducer<NonNullable<StateSchema[key]>>;
		}
	>;
}
const store = createReduxStore();

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
	const { route = '/', initialState, asyncReducers } = options;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
				<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>,
			</StoreProvider>
		</MemoryRouter>
	);
}
