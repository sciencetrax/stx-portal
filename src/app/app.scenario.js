var WEB_SERVICES_URL = 'http://localhost/StudyTrax';

describe('ApplicationController', function () {
	beforeEach(function () {
		// Make sure they are logged out
		browser().navigateTo('/index.html#/login');

		// When not authenticated, make sure that a request for the root will redirect
		// to the login page.
		browser().navigateTo('/index.html');
	});

	it('should redirect to the login page', function () {
		expect(browser().location().path()).toBe('/account/login');
	});
});
