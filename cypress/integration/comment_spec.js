/// <reference types="Cypress" />

describe('comments', () => {
  beforeEach(() => {
    cy.task('cleanDatabase');
    cy.registerUserIfNeeded();
    cy.login();
  })

  //article object
  const article = {
    title: "My New Article",
    description: "About a topic",
    body: "This is a new post",
    tagList: ["test"]
  }

  it('Test post comments with stubbed response', () => {
    cy.writeArticleAndPostComment(article); //from index.js file in 'support' folder
    cy.contains('[data-cy=comment]', 'great post 👍').should('be.visible');
  });
})