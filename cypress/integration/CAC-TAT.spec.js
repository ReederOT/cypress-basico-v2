/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencha os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste,Teste, teste, teste, '
        
        cy.get('#firstName').type('Reeder')
        cy.get('#lastName').type('OT')
        cy.get('#email').type('reeder.o.t@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 100})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário de email com formatação inválida.', function(){
        cy.get('#firstName').type('Reeder')
        cy.get('#lastName').type('OT')
        cy.get('#email').type('reeder.o.t@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('Campo telefone continua vazio, quando preenchido com valor não numerico.', function(){
        cy.get('#phone')
          .type('abcdefg')
          .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){ 
        cy.get('#firstName').type('Reeder')
        cy.get('#lastName').type('OT')
        cy.get('#email').type('reeder.o.t@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Reeder')
          .should('have.value', 'Reeder')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('OT')
          .should('have.value', 'OT')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('reeder.o.t@teste.com')
          .should('have.value', 'reeder.o.t@teste.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('123456789')
          .should('have.value', '123456789')
          .clear()
          .should('have.value', '')

        cy.get('#open-text-area')
          .type('Teste')
          .should('have.value', 'Teste')
          .clear()
          .should('have.value', '')
        
    })

})