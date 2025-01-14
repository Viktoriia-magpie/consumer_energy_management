///<reference types = "Cypress"/>
import selectors from '../support/selectors.js'
import { dataForStep1 } from '../fixtures/params.json'
import { currentHeatingSystemOptions } from '../fixtures/params.json'
import { newHeatingSystemOptions } from '../fixtures/params.json'
import { dataForStep2 } from '../fixtures/params.json'
describe('The heat prices calculations test suit for Savings calculator', () => {

    let previousCost;
    let previousNewCost;

    beforeEach(() => {
        cy.visit(selectors.calculator_link)
        cy.get(selectors.state_list).select(dataForStep1[0].province, { force: true }).invoke("text").should('contain', dataForStep1[0].province)
        cy.get(selectors.city_list).select(dataForStep1[0].city, { force: true }).invoke("text").should('contain', dataForStep1[0].city)
        cy.get(selectors.stories_list).select(dataForStep1[0].stories, { force: true }).invoke("text").should('contain', dataForStep1[0].stories)
        cy.get(selectors.square_feet_list).select(dataForStep1[0].square_feet, { force: true }).invoke("text").should('contain', dataForStep1[0].square_feet)
        cy.get(selectors.years_editbox).type(dataForStep1[0].years, { force: true }).invoke("val").should('contain', dataForStep1[0].years)
        cy.get(selectors.current_heating_cost).should('have.text', '$0.00')

    })

    currentHeatingSystemOptions.forEach(option => {
        it(`Verify that choosing ${option.heating_type} will change the price in the Current Heating Cost column`, { defaultCommandTimeout: 10000 }, () => {
            cy.selectCurrentHeatingSystem(option.heating_type)
            cy.get(selectors.current_heating_cost).should('not.have.text', '$0.00')
            cy.get(selectors.current_heating_cost).should('not.have.text', previousCost)
            cy.get(selectors.current_heating_cost).invoke('text').then((text) => {
                previousCost = text.trim();
            })
        })
    })

    newHeatingSystemOptions.forEach(option1 => {
        it(`Verify that choosing ${option1.new_heating_type} will change the price in the New Heating Cost column`, () => {
            cy.selectNewHeatingSystem(option1.new_heating_type)
            cy.get(selectors.new_heating_cost).should('not.have.text', '$0.00')
            cy.get(selectors.new_heating_cost).should('not.have.text', previousNewCost)
            cy.get(selectors.new_heating_cost).invoke('text').then((text) => {
                previousNewCost = text.trim;
            })
        })
    })

    dataForStep2.forEach(option2 => {
        it('Verify that when new and old types are chosen, savings are displayed', () => {
            cy.populateStep2(option2.current_heating_type, option2.new_heating_type)
            cy.get(selectors.annual_savings).should('not.have.text', '$0.00')
        })
    })

    dataForStep2.forEach(option2 => {
        it('Verify that when new and old types are chosen, total savings are updated', () => {
            cy.populateStep2(option2.current_heating_type, option2.new_heating_type)
            cy.get(selectors.total_annual_savings).should('not.have.text', '$0.00')
            cy.get(selectors.ten_years_savings).should('not.have.text', '$0.00')
        })
    })
})

