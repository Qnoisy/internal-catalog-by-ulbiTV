module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:i18next/recommended',
		'plugin:prettier/recommended' // ← включает eslint-config-prettier и правило prettier/prettier
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint', 'i18next', 'prettier', 'react-hooks'],
	rules: {
		// Делегируем стиль форматированию Prettier
		'prettier/prettier': 'error',

		// Табы в коде и JSX
		'no-tabs': 'off',
		indent: ['error', 'tab'],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],

		// Не спорим о запятых с Prettier
		'comma-dangle': 'off',

		// Твои правила как были
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				ignoreAttribute: ['data-testid', 'to']
			}
		],
		'max-len': [
			'error',
			{ code: 110, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }
		],

		// Снимаем ещё пару частых конфликтов с Prettier
		'implicit-arrow-linebreak': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'operator-linebreak': 'off',
		'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
		'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
		'no-param-reassign': 'off'
	},
	globals: { __IS_DEV__: true },
	overrides: [
		{
			files: ['**/src/**/*.test.{ts,tsx}'],
			rules: { 'i18next/no-literal-string': 'off' }
		}
	]
};
