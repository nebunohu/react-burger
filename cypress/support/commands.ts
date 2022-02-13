import { API_URL } from './../../src/utils/url';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.request({ 
    method: 'POST',
    url: `${API_URL}/auth/login`,
    body: { email: 'barashkov.nv@yandex.ru', password: '123456'}
  })
  .then((resp) => {
    window.localStorage.setItem('refreshToken', resp.body.refreshToken);
    window.localStorage.setItem('accessToken', resp.body.accessToken);
  })
})

Cypress.Commands.add('openOrderModal', () => {
  cy.get('[data-test-id="ingredient-item"]:first').as('dragItem');  
  cy.get('[data-test-id="drop-target"]').as('dropTarget');  

  cy.get('@dragItem').drag('@dropTarget');
  
  cy.get('[data-test-id="create-order-button"]').click();
})