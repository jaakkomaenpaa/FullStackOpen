describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jaakko',
      username: 'jaakkomae',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jaakkomae')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Jaakko logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jaakkomae')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('log in to application')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('jaakkomae')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('test_blog')
      cy.get('#author').type('test_author')
      cy.get('#url').type('test_url')
      cy.get('#create-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('test_blog test_author')
    })

    it('A blog can be liked', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted by user who added it', function() {
      cy.get('#view-button').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.get('html').should('not.contain', 'test_blog test_author')
    })

    it('Only the user who added the blog can see the remove button', function() {
      cy.contains('logout').click()
      const user = {
        name: 'testname',
        username: 'testuser',
        password: 'testpass'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpass')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('remove').should('not.be.visible');
    })

    
  })

})