import { selectByTestId } from '../helpers/selectBytestId';

describe('Routing', () => {
	describe('not autorization user', () => {
		// it('visit Main page', () => {
		// 	cy.visit('/');
		// 	cy.get(selectByTestId('MainPage')).should('exist');
		// });
		// it('visit Profile page', () => {
		// 	cy.visit('/profile/1');
		// 	cy.get(selectByTestId('MainPage')).should('exist');
		// });
		// it('visit Not found Page', () => {
		// 	cy.visit('/awdawdwa');
		// 	cy.get(selectByTestId('NotFoundPage')).should('exist');
		// });
	});
	describe('authorization user', () => {
		beforeEach(() => {
			cy.login('admin', '123');
		});
		it('ProfilePage', () => {
			cy.visit('/profile/1');
			cy.get(selectByTestId('ProfilePage')).should('exist');
		});
		it('ArticlesPage', () => {
			cy.visit('/articles');
			cy.get(selectByTestId('ArticlesPage')).should('exist');
		});
	});
});
