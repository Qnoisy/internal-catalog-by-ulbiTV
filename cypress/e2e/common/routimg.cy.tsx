describe('Routing', () => {
	it('visit Main page', () => {
		cy.visit('/');
		cy.get('[data-testid=MainPage]').should('exist');
	});
});
