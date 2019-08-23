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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Performs an XMLHttpRequest instead of a cy.request (able to send data as FormData - multipart/form-data)
Cypress.Commands.add("form_request", (formData, url) => {
    return cy
        .server()
        .route("POST", url)
        .as("formRequest")
        .window()
        .then(win => {
            const xhr = new win.XMLHttpRequest();
            xhr.open('POST', url);
            xhr.send(formData);
        })
        .wait("@formRequest");
});

Cypress.Commands.add('form_request_alternative', (formData, url, done) => {
    const xhr = new XMLHttpRequest();
    const method = 'POST';
    cy.task('log', url);
    xhr.open(method, url, true);
    xhr.onload = function () {
        done(xhr);
    };
    xhr.onerror = function () {
        done(xhr);
    };
    xhr.send(formData);
})