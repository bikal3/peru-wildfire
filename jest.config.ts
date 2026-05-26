import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^maplibre-gl$': '<rootDir>/__mocks__/maplibre-gl.ts',
    '^react-map-gl/maplibre$': '<rootDir>/__mocks__/react-map-gl.tsx',
    '^recharts$': '<rootDir>/__mocks__/recharts.tsx',
  },
}

export default createJestConfig(config)
