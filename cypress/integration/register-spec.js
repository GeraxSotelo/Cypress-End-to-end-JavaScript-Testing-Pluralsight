/// <reference types="Cypress" />

describe('Register', () => {
    it('register a new user', () => {
        const username = 'visitor';
        const email = 'infor@ad.com';
        const password = 'visiting';

        cy.visit('http://localhost:4100');
        cy.contains('a.nav-link', 'Sign up').click();

        cy.get('[data-cy=username]').type(username);
        cy.get('[data-cy=email]').type(email);
        cy.get('[data-cy=password]').type(password);

        cy.get('form').submit();
    });
})