// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', () => { return false })
import selectors from '../support/selectors.js'

Cypress.Commands.add('clickingOnMenuOptions', (button, link, h1) => {
    cy.contains(button).click()
    cy.url().should('eq', link)
    cy.get('h1', {force: true}).should('have.text', h1)
})


Cypress.Commands.add('selectProvince', (province) => {
    cy.get(selectors.state_list).select(province).invoke('text').should('contain', province)
})

Cypress.Commands.add('selectCity', (province) => {
    cy.get(selectors.state_list).select(province).invoke('text').should('contain', province)
    cy.get(selectors.city_list).find('option').should('have.length.greaterThan', 2)
})

Cypress.Commands.add('selectCurrentHeatingSystem', (heat_type) => {
    cy.get(selectors.current_heating_system_list).select(heat_type, { force: true }).invoke('text').should('contain', heat_type)
})