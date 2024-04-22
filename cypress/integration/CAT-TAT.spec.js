/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste Automação, Teste Automação, Teste Automação, Teste Automação, Teste Automação, Teste Automação' 

        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Walter Mateus')
        .should('have.value', 'Walter Mateus')

        cy.get('#lastName')
        .should('be.visible')
        .type('Harder')
        .should('have.value', 'Harder')

        cy.get('#email')
        .should('be.visible')
        .type('walter.harder@gmail.com')
        .should('have.value', 'walter.harder@gmail.com')

        cy.get('#open-text-area')
        .should('be.visible')
        .type(longText, {delay: 0})
        .should('have.value', longText)

        cy.contains('button','Enviar')
        .should('be.visible')
        .click()

        cy.get('.success')
        .should('be.visible')

        //Com CSS usar o .and('have.text','')
        cy.get('body > span.success > strong')
        .should('be.visible')
        .and('have.text', 'Mensagem enviada com sucesso.')

        //Com xpath usar o cy.contains()
        cy.get('span[class="success"]')
        cy.contains('Mensagem enviada com sucesso.')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Walter Mateus')
      .should('have.value', 'Walter Mateus')

      cy.get('#lastName')
      .should('be.visible')
      .type('Harder')
      .should('have.value', 'Harder')

      cy.get('#email')
      .should('be.visible')
      .type('walter.harder@gmail')
      .should('have.value', 'walter.harder@gmail')

      cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste Automação')
      .should('have.value', 'Teste Automação')

      cy.contains('button','Enviar')
      .should('be.visible')
      .click()

      cy.get('.error')
      .should('be.visible')

      cy.get('body > span.error > strong')
      .should('be.visible')
      .and('have.text', 'Valide os campos obrigatórios!')

      // cy.get('input[id="email"]')
      // .clear()
      // .wait(2000)
      // .should('have.value', '')

      // cy.get('input[id="email"]')
      // .should('be.visible')
      // .type('walter.harder@gmail.com')
      // .should('have.value', 'walter.harder@gmail.com')

      // cy.contains('button','Enviar')
      // .should('be.visible')
      // .click()

      // cy.get('body > span.success > strong')
      // .should('be.visible')
      // .and('have.text', 'Mensagem enviada com sucesso.')
    })

    it('Validar que o campo Telefone não aceita caracteres especias e letras', function() {
      cy.get('input[id="phone"]')
      .should('be.visible')
      .type('ABCDEFGHIJ')
      .wait(2000)
      .should('have.value', '')
      .type('!@#$%¨&*')
      .wait(2000)
      .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Walter Mateus')
      .should('have.value', 'Walter Mateus')

      cy.get('#lastName')
      .should('be.visible')
      .type('Harder')
      .should('have.value', 'Harder')

      cy.get('#email')
      .should('be.visible')
      .type('walter.harder@gmail.com')
      .should('have.value', 'walter.harder@gmail.com')

      cy.get('#phone-checkbox')
      .check()

      cy.get('#open-text-area')
      .should('be.visible')
      .type('Teste Automação',)
      .should('have.value', 'Teste Automação')

      cy.contains('button','Enviar')
      .should('be.visible')
      .click()

      cy.get('span[class="error"]')
      .should('be.visible')

      cy.get('body > span.error > strong')
      .should('be.visible')
      .and('have.text', 'Valide os campos obrigatórios!')

      // cy.get('input[id="phone"]')
      // .should('be.visible')
      // .type('11985858585')
      // .should('have.value', '11985858585')

      // cy.contains('button','Enviar')
      // .should('be.visible')
      // .click()

      // cy.get('span[class="success"]')
      // .should('be.visible')

      // cy.get('body > span.success > strong')
      // .should('be.visible')
      // .and('have.text', 'Mensagem enviada com sucesso.')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
      cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Walter Mateus')
      .should('have.value', 'Walter Mateus')
      .clear()
      .should('have.value', '')

      cy.get('input[id="lastName"]')
      .should('be.visible')
      .type('Harder')
      .should('have.value', 'Harder')
      .clear()
      .should('have.value', '')

      cy.get('input[id="email"]')
      .should('be.visible')
      .type('walter.harder@gmail.com')
      .should('have.value', 'walter.harder@gmail.com')
      .clear()
      .should('have.value', '')

      cy.get('input[id="phone"]')
      .should('be.visible')
      .type('11985858585')
      .should('have.value', '11985858585')
      .clear()
      .should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.contains('button','Enviar')
      .should('be.visible')
      .click()

      cy.get('span[class="error"]')
      .should('be.visible')

      cy.get('body > span.error > strong')
      .should('be.visible')
      .and('have.text', 'Valide os campos obrigatórios!')
    })

    it('Envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success')
      .should('be.visible')
    })

    it('Preenche os campos obrigatórios e envia o formulário utilizando o cy.contains', function() {
      const longText = 'Teste Automação, Teste Automação, Teste Automação, Teste Automação, Teste Automação, Teste Automação' 

      cy.get('#firstName')
      .type('Walter Mateus')
      .should('have.value', 'Walter Mateus')

      cy.get('#lastName')
      .type('Harder')
      .should('have.value', 'Harder')

      cy.get('#email')
      .type('walter.harder@gmail.com')
      .should('have.value', 'walter.harder@gmail.com')

      cy.get('#open-text-area')
      .type(longText, {delay: 0})
      .should('have.value', longText)

      cy.contains('button','Enviar')
      .click()

      cy.get('.success')
      .should('be.visible')

      //Com CSS usar o .and('have.text','')
      cy.get('body > span.success > strong')
      .should('be.visible')
      .and('have.text', 'Mensagem enviada com sucesso.')

      //Com xpath usar o cy.contains()
      cy.get('span[class="success"]')
      cy.contains('Mensagem enviada com sucesso.')
    })

    it('Selecione um produto YOUTUBE pelo seu texto', function(){
      cy.get('#product').select('YouTube')
      cy.get('#product').should('have.value', 'youtube')
    })

    it('Selecione um produto MENTORIA pelo seu texto', function(){
      cy.get('#product').select('mentoria')
      cy.get('#product').should('have.value', 'mentoria')
    })

    it('Selecione um produto Blog pelo seu texto', function(){
      cy.get('select').select(1)
      cy.get('select').should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3) // Valida que o que está mapeado no get, econtrou 3 radios.
        .each(function($radio){   // Para cada $radio encontrado, vai fazer...
          cy.wrap($radio).check() // Encapsular e fazer o check..
          cy.wrap($radio).should('be.checked')  // Validar que está selecionado. 
        })
    })

    it('marca ambos checkboxes, depois desmarca o último - Resolução sozinho, igual o conteúdo do TALKING ABOUT TESTING', function(){
      cy.get('input[type="checkbox"]')
        .as('checkboxes') //passando um alias, nomeando os campos que são do tipo checkbox com 'checkbox'
        .check()
      cy.get('@checkboxes') //Para cada checkbox eu vou validar que estão todos checked. 
        .each(checkbox => {
          expect(checkbox[0].checked).to.equal(true)
        })
      cy.get('input[type="checkbox"]').last() //Selecionando o último checkbox e removedo a seleção.
        .uncheck()
        .should('not.be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último - Resolução do exercício aula', function(){
      cy.get('input[type="checkbox"]') //Nessa resolução, o get está pegando todos os checkbox e selecionando todos de uma vez.
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
        .should('not.have.value') //valida que o cmapo está vazio
        .selectFile('./cypress/fixtures/example.json')
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json') //Seleciona o caminho do elemento na aplicação (como se fosse mapear um Xpath para um jason)
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //Simula o drag and drop
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json', {encoding: null}).as('file') //passando um alias, sem precisar passar um caminho relativo
      cy.get('input[type="file"]')
        .selectFile('@file') //fazendo o upload do arquivo que recebeu o nome de 'file' 
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json') //Então eu verifico se o arquivo está no input, validando o seu nome. 
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy > a').should('have.attr', 'target', '_blank') //'have.attr' verifica se o elemento que estoou mapeando tem algum atributo, passando os demais por parâmetro
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy > a').invoke('removeAttr', 'target').click() // invoke permite invoke um atributo, neste caso invocou o 'removeAttr' para remover um atributo.

      cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function(){
      cy.get('#privacy > a').invoke('removeAttr', 'target').click() // invoke permite invoke um atributo, neste caso invocou o 'removeAttr' para remover um atributo.

      cy.contains('Talking About Testing').should('be.visible')
    })
})
