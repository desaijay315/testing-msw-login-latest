/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const cucumber = require('cypress-cucumber-preprocessor').default
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// promisified fs module
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
  if(!fs.existsSync(pathToConfigFile)){
    return {};
  }

  return fs.readJson(pathToConfigFile)
}

const injectDevServer = require('@cypress/react/plugins/react-scripts')

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  injectDevServer(on, config)
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // accept a configFile value or use development by default
  const file = config.env.configFile

  return getConfigurationByFile(file)
}