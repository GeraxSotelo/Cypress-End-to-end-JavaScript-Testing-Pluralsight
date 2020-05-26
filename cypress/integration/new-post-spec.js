/// <reference types="Cypress" />

describe('New Post on Conduit', () => {
    //adding a hook that runs before the test
    beforeEach(() => {
        cy.task('cleanDatabase');
        cy.registerUserIfNeeded();
        cy.login();
    })

    it('write a new post', () => {
        //Fill details to write a new post
        cy.get('[data-cy=new-post]').click();
        cy.get('[data-cy=title]').type('My New Post');
        cy.get('[data-cy=about]').type('This is my new post and I am excited');
        cy.get('[data-cy=article]').type('Here is my lengthy article...');
        //'enter' in curly braces uses the 'enter' key on the keyboard
        cy.get('[data-cy=tags]').type('test{enter}');
        cy.get('[data-cy=publish]').click();

        //assertion to check url
        cy.location('pathname').should('equal', '/article/my-new-post');
    });
})