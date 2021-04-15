describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Emiliano',
      username: 'emip',
      password: 'secret',
    });
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Mr. Test',
      username: 'test',
      password: 'secret',
    });
    cy.visit('http://localhost:3000');
  });

  it('app works', function () {
    cy.contains('Login to application');
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('login form can be closed', function () {
    cy.contains('log in').click();
    cy.contains('cancel').click();
    cy.get('html').should('not.contain', cy.get('#username'));
    cy.get('html').should('not.contain', cy.get('#password'));
  });

  describe('Login', function () {
    it('succeeds with valid credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('emip');
      cy.get('#password').type('secret');
      cy.contains('login').click();
      cy.contains('Emiliano logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('emip');
      cy.get('#password').type('sekret');
      cy.contains('login').click();
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'Emiliano logged in');
    });

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'emip', password: 'secret' });
      });

      it('a blog can be created', function () {
        cy.createBlog({
          title: 'blog created with cypress',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
        });
        cy.contains('blog created with cypress');
      });

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'another blog created with cypress',
            author: 'Emi',
            url: 'cypress.io',
          });
        });

        it('user can like it', function () {
          cy.contains('another blog created with cypress').find('button').click();
          cy.contains('like').click();
          cy.contains('likes 1');
        });

        it('user can delete it if he created it', function () {
          cy.contains('another blog created with cypress').find('button').click();
          cy.contains('remove').click();
          cy.get('html').should('not.contain', 'another blog created with cypress');
        });

        it('user cannot delete it if he did not create it', function () {
          cy.contains('logout').click();
          cy.login({ username: 'test', password: 'secret' });
          cy.contains('another blog created with cypress').as('theBlog');
          cy.get('@theBlog').find('button').contains('show').click();
          cy.get('html').should(
            'not.contain',
            cy.get('@theBlog').find('button').contains('remove')
          );
        });
      });
    });
  });
});
