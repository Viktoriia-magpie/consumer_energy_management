///<reference types = "Cypress"/>
import {menuOptions} from '../fixtures/params.json'

describe('The sanity test suit for main page', () => {
  
    beforeEach(() => {
    cy.visit('/')
  })

  it('navigate to the main page', () => {  
    cy.url().should('eq', 'https://consumersenergymanagement.ca/')
  })

  it('verify clicking on Home menu option opens the Home page', () => {
    cy.contains('Home').click()
    cy.url().should('eq', 'https://consumersenergymanagement.ca/')
  })

   menuOptions.forEach(option => {
    it(`should navigate to ${option.button} page correctly`, () => {
      cy.clickingOnMenuOptions(option.button, option.link, option.h1);
    });
  })
})