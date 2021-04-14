Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password }).then(
    res => {
      localStorage.setItem('loggedUser', JSON.stringify(res.body));
      cy.visit('http://localhost:3000');
    }
  );
});

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    url: 'http://localhost:3001/api/notes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
    body: { content, important },
  });
  cy.visit('http://localhost:3000');
});
