import { classNames } from './classNames';

describe('classnames', () => {
	test('first', () => {
		expect(classNames('test')).toBe('test');
	});
	test('sec', () => {
		const res = 'test test2';
		expect(classNames('test', {}, ['test2'])).toBe(res);
	});
	test('t', () => {
		const res = 'test test2 hovered scrollable';
		expect(
			classNames('test', { hovered: true, scrollable: true }, ['test2'])
		).toBe(res);
	});
	test('f', () => {
		const res = 'test test2 hovered';
		expect(
			classNames('test', { hovered: true, scrollable: false }, ['test2'])
		).toBe(res);
	});
	test('s', () => {
		const res = 'test test2 hovered';
		expect(
			classNames('test', { hovered: true, scrollable: undefined }, ['test2'])
		).toBe(res);
	});
});
