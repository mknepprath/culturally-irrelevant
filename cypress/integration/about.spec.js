describe("About", () => {
  before(() => {
    cy.visit("/about");
  });

  it('should render About page', () => {
    cy.get('[data-cy="about-page"]').should('be.visible')
  })

  it('should navigate to Mixtape', () => {
    cy.get('[data-cy="mixtape-link"]').click()
    cy.url().should('include', '/mixtape')
  })
});
