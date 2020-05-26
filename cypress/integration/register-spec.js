/// <reference types="Cypress" />

describe('Register', () => {
    it('register a new user', () => {
        const username = 'visitorone';
        const email = 'infoone@adone.com';
        const password = 'visiting';

        cy.visit('http://localhost:4100');
        cy.contains('a.nav-link', 'Sign up').click();

        //assertion. should navigate to registration page
        cy.location('pathname').should('equal', '/register');

        cy.get('[data-cy=username]').type(username);
        cy.get('[data-cy=email]').type(email);
        cy.get('[data-cy=password]').type(password);

        cy.get('form').submit();

        //should navigate to home page
        cy.location('pathname').should('equal', '/');
        //profile should be visible
        cy.get('[data-cy=profile]').should('be.visible');

        //ensure 'a.nav-link' is available and contains the text 'Your Feed' and
        //assert it has class 'nav-link active'
        cy.contains('a.nav-link', 'Your Feed').should('have.class', 'nav-link active');
        cy.contains('a.nav-link', 'Global Feed').should('not.have.class', 'nav-link active');

        cy.contains('a.nav-link', 'Global Feed').click();
        cy.contains('a.nav-link', 'Global Feed').should('have.class', 'nav-link active');
        cy.contains('a.nav-link', 'Your Feed').should('not.have.class', 'nav-link active');
    });
})