describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Emiliano',
      username: 'emip',
      password: 'secret',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('emip');
    cy.get('#password').type('secret');
    cy.get('#login-button').click();
    cy.contains('Emiliano logged in');
  });

  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('emip');
    cy.get('#password').type('sekret');
    cy.contains('login').click();
    cy.get('.error').contains('Invalid username or password');
    cy.get('html').should('not.contain', 'Emiliano logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'emip', password: 'secret' });
    });

    it('a new note can be created', function () {
      cy.createNote({ content: 'a note created by cypress', important: false });
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note created by cypress',
          important: false,
        });
      });

      it('it can be made important', function () {
        cy.contains('another note created by cypress')
          .contains('make important')
          .click();
        cy.contains('another note created by cypress').contains(
          'make not important'
        );
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').contains('make important').as('theButton');
        cy.get('@theButton').click();
        cy.contains('second note').contains('make not important');
      });
    });
  });
});
