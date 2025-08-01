/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'lcov'],
		},
	},
})
