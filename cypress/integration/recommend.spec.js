describe("Recommend", () => {
  before(() => {
    cy.visit("/recommend");
  });

  it('should render Recommend page', () => {
    cy.get('[data-cy="recommend-page"]').should('be.visible')
  })
});
