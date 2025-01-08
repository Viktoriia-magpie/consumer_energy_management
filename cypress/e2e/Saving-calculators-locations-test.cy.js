///<reference types = "Cypress"/>
import { provincesListOptions } from '../fixtures/params.json'


describe('The location test suit for Savings calculator page', () => {

  beforeEach(() => {
    cy.visit('/savings-calculator/')
  })

  it('navigate to the Savings calculator page', () => {
    cy.url().should('eq', 'https://consumersenergymanagement.ca/savings-calculator/')
  })


  provincesListOptions.forEach(item => {
    it(`Verify ${item.province} is on the state list and can be chosen`, () => {
      cy.selectProvince(item.province)
    })
  })

  provincesListOptions.forEach(item => {
    it(`Verify ${item.province} province has at least one city to choose`, {defaultCommandTimeout: 10000}, () => {
      cy.selectCity(item.province)
    })
  })
})