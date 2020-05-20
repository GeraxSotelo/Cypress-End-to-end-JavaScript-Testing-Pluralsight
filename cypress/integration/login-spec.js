/// <reference types="Cypress" />

describe('login test suite', () => {
    it('does not work with wrong credentials', () => {
        cy.visit("http://localhost:4100");
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=username]').type('info');
        cy.get('[data-cy=password]').type('visitor');
        cy.get('[data-cy=login-form]').submit();

        cy.contains('.error-messages li', 'email must be a valid email');
    });

    it('happy path test', () => {
        cy.visit("http://localhost:4100");
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=username]').type('visitor');
        cy.get('[data-cy=password]').type('visiting');
        cy.get('[data-cy=login-form]').submit();
    });
})