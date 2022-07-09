describe("404", () => {
  before(() => {
    cy.visit({ url: "/bad-url", failOnStatusCode: false }); // Should fail
  });

  it('should render 404 page', () => {
    cy.get('[data-cy="404-page"]').should('be.visible')
  })
});
