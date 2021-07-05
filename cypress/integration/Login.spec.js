describe('Fully automated end to end testing suite', function(){
    it('see if the login is succesful and return username', () => {  
        cy.visit('/')     
          const userCred = {
            "user": {
              "username": Cypress.env('username'),
              "password": Cypress.env('password')
            }
          }
        cy.get('#username-field').type(userCred.user.username)
        cy.get('#password-field').type(userCred.user.password)
        cy.get('button').click()
    
        cy.log('After Login Successful')
        cy.get('strong').should('contain',userCred.user.username)
    });
})
