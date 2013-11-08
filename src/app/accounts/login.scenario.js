var APPLICATION_PATH = 'http://localhost/StudyTrax';

describe('ApplicationController', function () {
	describe('smoke test', function () {
		beforeEach(function () {
			browser().navigateTo('/index.html#/login');
		});

		it('login', function () {
			expect(browser().location().path()).toBe('/account/login');
			input('authorization.username').enter('1');
			input('authorization.password').enter('1');
			element('.btn.login').click();
			expect(browser().location().path()).toBe('/home/index/summary');
		});
	});
});