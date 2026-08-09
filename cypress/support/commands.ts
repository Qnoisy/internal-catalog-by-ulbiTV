export {};

Cypress.Commands.add('login', (email, password) => {});

declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, password: string): Cypress.Chainable<void>;
		}
	}
}
