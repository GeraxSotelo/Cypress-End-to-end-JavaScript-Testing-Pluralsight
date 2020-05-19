/// <reference types="Cypress" />

//The describe function is used to describe the test suite by giving it a unique name
describe("My First Test Suite", () => {
    //The 'it' function comes from Mocha. Gives a name to the test
    it('test url works', () => {
        //All cypress commands begin with cy
        cy.visit('http://localhost:4100');
    });
    it('test signup exists', () => {
        //Use the cy.contains() function to get the DOM element containing certain text
        //Verify the DOM element 'a' with the class 'nav-link' exists and contains the text 'Sign-up'
        //Use the click() function to click on an element that Cypress found
        cy.contains('a.nav-link', 'Sign up').click();
    });
})




