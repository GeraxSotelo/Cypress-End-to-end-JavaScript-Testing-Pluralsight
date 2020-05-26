/// <reference types="Cypress" />

describe('login test suite', () => {
    it('does not work with wrong credentials', () => {
        cy.visit("http://localhost:4100");
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=username]').type('info');
        cy.get('[data-cy=password]').type('visitor');
        cy.get('[data-cy=login-form]').submit();

        //find '.error-messages' class with child 'li' that contains specific message
        cy.contains('.error-messages li', 'email must be a valid email');

        //assertiion that we are still in login page
        cy.location('pathname').should('equal', '/login');
    });

    it('happy path test', () => {
        cy.visit("http://localhost:4100");
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=username]').type('infor@ad.com');
        cy.get('[data-cy=password]').type('visiting');
        cy.get('[data-cy=login-form]').submit();

        //assertions that login happened correctly
        cy.get('[data-cy=profile]').should('be.visible');
        cy.location('pathname').should('equal', '/');

        cy.get('[data-cy=your-feed]').should('have.class', 'nav-link active');
        cy.get('[data-cy=global-feed]').should('not.have.class', 'nav-link active');

        cy.get('[data-cy=global-feed]').click();
        cy.get('[data-cy=global-feed]').should('have.class', 'nav-link active');
        cy.get('[data-cy=your-feed').should('not.have.class', 'nav-link active');
    });
})