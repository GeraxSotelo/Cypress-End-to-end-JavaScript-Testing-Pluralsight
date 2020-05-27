/// <reference types="Cypress" />

describe('New Post on Conduit', () => {
    //adding a hook that runs before the test
    beforeEach(() => {
        cy.task('cleanDatabase');
        cy.registerUserIfNeeded();
        cy.login();

        //Define aliases - Remember not to create aliases when you are deep in the chain
        //Place certain aliases in beforeEach() hook because it runs before each test so aliases will be defined for each test
        //You can also define aliases within a test and reference them within the test if you have a lengthy test.
        //When you use the as() command to define aliases, you can use the '@' command to reference them, but you can only do that with cy.get() or cy.wait()
        cy.get('[data-cy=new-post]').click().as('ClickOnNewPost');
        cy.get('[data-cy=title]').as('Title');
        cy.get('[data-cy=about]').as('About');
        cy.get('[data-cy=article]').as('Article');
        cy.get('[data-cy=tags]').as('Tags');
        cy.get('[data-cy=publish]').as('Publish');

        //Do not create state changing aliases within beforeEach() hook
        //DO NOT DO THIS
        //cy.get('[data-cy=publish]').click().as('ClickPublish');
    })

    it('write a new post', () => {
        //Fill details to write a new post
        cy.get('@ClickOnNewPost'); //using alias
        cy.get('@Title').type('My New Post');
        cy.get('@About').type('This is my new post and I am excited');
        cy.get('@Article').type('Here is my lengthy article...');
        //'enter' in curly braces uses the 'enter' key on the keyboard
        cy.get('@Tags').type('test{enter}');
        cy.get('@Publish').click();

        //assertion to check url
        cy.location('pathname').should('equal', '/article/my-new-post');
    });

    it('edit article', () => {
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

        //editing the article
        cy.get('[data-cy=edit-article]').click();
        cy.location('pathname').should('equal', '/editor/my-new-post');

        cy.get('[data-cy=title]').clear().type('My Edited Title');
        cy.get('[data-cy=article]').clear().type('Here is my edited lengthy article...');
        cy.get('[data-cy=tags]').clear().type('MyNewTag{enter}EditedArticle{enter}');
        cy.get('[data-cy=publish]').click();
        cy.location('pathname').should('equal', '/article/my-edited-title');
    });

    it('favorite an article test', () => {
        //Fill details to write a new post
        cy.get('[data-cy=new-post]').click();
        cy.get('[data-cy=title]').type('My New Post');
        cy.get('[data-cy=about]').type('This is my new post and I am excited');
        cy.get('[data-cy=article]').type('Here is my lengthy article...');
        cy.get('[data-cy=tags]').type('test{enter}');
        cy.get('[data-cy=publish]').click();

        //assertion to check url
        cy.location('pathname').should('equal', '/article/my-new-post');

        //go to profile page
        cy.get('[data-cy=profile]').click();
        cy.location('pathname').should('equal', '/@testuser');

        //favorite the article
        //find element with 'article-preview'. There should only be 1 for this test
        //get the first 1, find the 'fav-article' button & click it.
        cy.get('.article-preview').should('have.length', 1).first().find('[data-cy=fav-article]').click();

        //validate that it is in the 'fav articles' tab
        cy.get('[data-cy=favorited-articles]').click();
        cy.location('pathname').should('equal', '/@testuser/favorites');
        cy.contains('.article-preview', 'My New Post');
    });
})