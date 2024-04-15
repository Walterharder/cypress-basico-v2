Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longText = 'Teste Automação, Teste Automação, Teste Automação, Teste Automação, Teste Automação, Teste Automação' 

    cy.get('input[id="firstName"]')
    .type('Walter Mateus')
    .should('have.value', 'Walter Mateus')

    cy.get('#lastName')
    .type('Harder')
    .should('have.value', 'Harder')

    cy.get('#email')
    .type('walter.harder@gmail.com')
    .should('have.value', 'walter.harder@gmail.com')

    cy.get('#open-text-area')
    .type(longText)
    .should('have.value', longText)

    cy.contains('button','Enviar')
    .click()
})
