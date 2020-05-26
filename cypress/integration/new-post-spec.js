/// <reference types="Cypress" />

describe('New Post on Conduit', () => {
    //adding a hook that runs before the test
    beforeEach(() => {
        cy.task('cleanDatabase');
        cy.registerUserIfNeeded();
        cy.login();
    })
})