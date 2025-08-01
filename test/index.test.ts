/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { expect, test, vi } from 'vitest'
import { loadState } from '../lib/index.ts'

/**
 * Mock initial state input elements
 * @param app first part of the key
 * @param key second part of the key
 * @param value value to be stored
 */
function appendInput(app: string, key: string, value: string) {
	const input = document.createElement('input')
	input.setAttribute('type', 'hidden')
	input.setAttribute('id', `initial-state-${app}-${key}`)
	input.setAttribute('value', btoa(JSON.stringify(value)))
	document.querySelector('body')!.appendChild(input)
}

test('throw if nothing found', () => {
	expect(() => loadState('test', 'key')).toThrow(new Error('Could not find initial state key of test'))
})

test('return default if provided', () => {
	expect(loadState('test', 'key', 'default')).toBe('default')
})

test('find correct value', () => {
	appendInput('test', 'key', 'foo')

	const state = loadState('test', 'key')
	expect(state).toBe('foo')
})

test('returns cached value with consequent calls', () => {
	vi.spyOn(JSON, 'parse')

	appendInput('test', 'cachedKey', 'foo')

	for (let i = 0; i < 10; i++) {
		loadState('test', 'cachedKey')
	}

	expect(JSON.parse).toHaveBeenCalledTimes(1)
})
