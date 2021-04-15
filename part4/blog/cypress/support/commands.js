Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password }).then(
    res => {
      localStorage.setItem('loggedUser', JSON.stringify(res.body));
      cy.visit('http://localhost:3000');
    }
  );
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
    body: { title, author, url },
  });
  cy.visit('http://localhost:3000');
});
