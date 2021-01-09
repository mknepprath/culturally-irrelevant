describe("Mixtape", () => {
  before(() => {
    cy.visit("/mixtape");
  });

  it('should render Mixtape page', () => {
    cy.get('[data-cy="mixtape-page"]').should('be.visible')
  })
});
