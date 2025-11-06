/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { beforeEach, expect, test, vi } from 'vitest'
import { loadState } from '../lib/index.ts'

beforeEach(() => vi.resetAllMocks())

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

test('throws if state cannot be parsed and no fallback is provided', () => {
	const errorLog = vi.spyOn(console, 'error')
	errorLog.mockImplementationOnce(() => {})

	appendInput('app', 'key', 'value')
	const spy = vi.spyOn(JSON, 'parse')
	spy.mockImplementationOnce(() => {
		throw new Error('mocked parsing exception')
	})

	expect(() => loadState('app', 'key')).toThrowError('Could not parse initial state key of app')
	expect(errorLog).toHaveBeenCalledOnce()
})

test('returns fallback if state cannot be parsed but fallback is provided', () => {
	const errorLog = vi.spyOn(console, 'error')
	errorLog.mockImplementationOnce(() => {})

	appendInput('app', 'key', 'value')
	const spy = vi.spyOn(JSON, 'parse')
	spy.mockImplementationOnce(() => {
		throw new Error('mocked parsing exception')
	})

	expect(loadState('app', 'key', 'fallback')).toBe('fallback')
	expect(errorLog).toHaveBeenCalled()
})

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
