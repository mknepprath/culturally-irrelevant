describe("Home", () => {
  before(() => {
    cy.visit("/");
  });

  it('should render Home page', () => {
    cy.get('[data-cy="home-page"]').should('be.visible')
  })

  it('should render recommendation cards', () => {
    cy.get('[data-cy="home-grid"]').find('a').should('have.length', 16)
  })

  it('should filter results after search', () => {
    cy.get('input')
      .type('in the mood for love 2000 film ben lundsten')
    cy.get('[data-cy="home-grid"]').find('a').should('have.length', 1)
    cy.contains("In The Mood for Love (2000 Film)");
  })

  it('should navigate to About', () => {
    cy.get('[data-cy="about-link"]').click()
    cy.url().should('include', '/about')
  })
});
