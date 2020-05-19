/// <reference types="Cypress" />

//The describe function is used to describe the test suite by giving it a unique name
describe("My First Test Suite", () => {
    //The 'it' function comes from Mocha. Gives a name to the test
    it('test url works', () => {
        //All cypress commands begin with cy
        cy.visit('http://localhost:4100');
    });
})




