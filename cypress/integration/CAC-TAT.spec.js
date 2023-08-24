/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preencha os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Reeder')
        cy.get('#lastName').type('OT')
        cy.get('#email').type('reeder.o.t@teste.com')
        cy.get('#open-text-area').type('Teste caixa de texto.')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    }) 
})