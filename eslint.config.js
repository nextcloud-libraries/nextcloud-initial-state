/*
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: CC0-1.0
 */

import { recommendedLibrary } from '@nextcloud/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	...recommendedLibrary,
	{
		rules: {
			// this is quite a lowlevel library without dependencies - so no dependency on the logger
			'no-console': 'off',
		},
	},
])
