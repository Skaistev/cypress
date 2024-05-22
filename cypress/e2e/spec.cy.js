/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');
    cy.contains('<h1>','Next player')
  })
})

describe('Button', () => {
  before(() => {
    cy.visit('localhost:5173')
  });

  it('button', () => {
    cy.get('button').should('contain.text', 'Go to game start'),
    cy.get('button.btnHome').click(),
    cy.contains('<h1>','Next player:X')
  });
});