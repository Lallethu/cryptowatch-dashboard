import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,
	{
		files: ['src/**/*.ts'],
		extends: [...angular.configs.tsRecommended],
		processor: angular.processInlineTemplates,
		languageOptions: {
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'error', // pas de any
			'@typescript-eslint/explicit-function-return-type': 'off', // Angular génère beaucoup de void implicites
			'@typescript-eslint/no-floating-promises': 'error', // toujours gérer les promises
			'@typescript-eslint/no-misused-promises': 'error',

			'@angular-eslint/component-selector': [
				'error',
				{ type: 'element', prefix: 'app', style: 'kebab-case' },
			],
			'@angular-eslint/directive-selector': [
				'error',
				{ type: 'attribute', prefix: 'app', style: 'camelCase' },
			],
			'@angular-eslint/no-empty-lifecycle-method': 'error',
			'@angular-eslint/use-lifecycle-interface': 'error', // toujours implémenter OnInit etc.
			'@angular-eslint/no-input-rename': 'error',
			'@angular-eslint/no-output-rename': 'error',
			'@angular-eslint/no-output-on-prefix': 'error', // onXxx → xxx sur les @Output

			'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
			'no-var': 'error',
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],
			'no-eval': 'error',
			'no-async-promise-executor': 'error',
			'require-await': 'warn',
		},
	},
	{
		files: ['src/**/*.html'],

		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
		],

		rules: {
			'@angular-eslint/template/no-negated-async': 'error',
			'@angular-eslint/template/use-track-by-function': 'warn', // perf : trackBy sur les *ngFor
			'@angular-eslint/template/alt-text': 'error', // accessibilité images
			'@angular-eslint/template/no-autofocus': 'warn',
		},
	},
	prettier,
	{
		ignores: ['node_modules/**', 'dist/**', '.angular/**', '**/*.spec.ts'],
	},
);
