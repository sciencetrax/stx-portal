var WEB_SERVICES_URL = 'http://localhost/StudyTrax';

describe('ApplicationController', function () {
		beforeEach(function () {
			browser().navigateTo('/index.html#/login');
		});

		xit('register', function () {
 			expect(browser().location().path()).toBe('/login/login');
			element('.btn.register').click();
			input('account.username', '3');
			input('account.FirstName', 'John');
			input('account.LastName', 'Smith');
			input('account.emailAddress', 'Smith');
			input('account.password', 'pw');
			element('.btn.sign-up').click();

			expect(element('#errors').text()).toContain(LS.errorMessages.EnrollmentFull);
			expect(browser().location().path()).toBe('/login/register');
		});
});