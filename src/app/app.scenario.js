var WEB_SERVICES_URL = 'http://localhost/StudyTrax';

describe('ApplicationController', function () {
	describe('smoke test', function () {
		beforeEach(function () {
//			browser().reload()
			browser().navigateTo('/index.html#/login');
		});

		it('initial state', function () {
			expect(browser().location().path()).toBe('/login/login');
		});

		it('register', function () {
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

		it('login', function () {
			expect(browser().location().path()).toBe('/login/login');
			input('authorization.username').enter('1');
			input('authorization.password').enter('1');
			element('.btn.login').click();
			expect(browser().location().path()).toBe('/home/index/summary');
		});
	});
});