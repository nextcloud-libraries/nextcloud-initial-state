import { expect, test } from 'vitest'
import { loadState } from '../lib'

test('throw if nothing found', () => {
	expect(() => loadState('test', 'key')).toThrow(new Error('Could not find initial state key of test'))
})

test('return default if provided', () => {
	expect(loadState('test', 'key', 'default')).toBe('default')
})

test('find correct value', () => {
	const input = document.createElement('input')
	input.setAttribute('type', 'hidden')
	input.setAttribute('id', 'initial-state-test-key')
	input.setAttribute('value', btoa(JSON.stringify('foo')))
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	document.querySelector('body')!.appendChild(input)

	const state = loadState('test', 'key')

	expect(state).toBe('foo')
})
