/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/**
 * @param app app ID, e.g. "mail"
 * @param key name of the property
 * @param fallback optional parameter to use as default value
 * @throws if the key can't be found
 */
export function loadState<T>(app: string, key: string, fallback?: T): T {
	const selector = `#initial-state-${app}-${key}`
	if (window._nc_initial_state?.has(selector)) {
		return window._nc_initial_state.get(selector) as T
	} else if (!window._nc_initial_state) {
		window._nc_initial_state = new Map<string, unknown>()
	}

	const elem = document.querySelector<HTMLInputElement>(selector)

	if (elem === null) {
		if (fallback !== undefined) {
			return fallback
		}
		throw new Error(`Could not find initial state ${key} of ${app}`)
	}

	try {
		const parsedValue = JSON.parse(atob(elem.value))
		window._nc_initial_state.set(selector, parsedValue)
		return parsedValue
	} catch (e) {
		throw new Error(`Could not parse initial state ${key} of ${app}`)
	}
}
