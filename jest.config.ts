import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'jsdom',
}

export default jestConfig
