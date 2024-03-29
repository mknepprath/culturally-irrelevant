const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1300,
  defaultCommandTimeout: 20000,
  video: false,
  projectId: '4fj1za',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    testIsolation: false,
  },
})
