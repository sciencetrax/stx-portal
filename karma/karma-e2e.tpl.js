module.exports = function ( karma ) {
	karma.set({
		/**
		 * From where to look for files, starting with the location of this file.
		 */
		basePath: '../',

		/**
		 * This is the list of file patterns to load into the browser during testing.
		 */
		files: [
			'vendor/**/navigableHash.js',
			'src/**/locale-en.js',
			'src/**/*.scenario.*',

			// Serve the contents of the "dist" folder as static files
			{pattern: 'build/**/*', watched: false, included: false, served: true}
		],
		proxies: {
			'/': 'http://localhost:9020/base/build/',
			'/StudyTrax/': 'http://localhost/StudyTrax/'
		},

		urlRoot: '/__karma/',
		frameworks: [ 'ng-scenario' ],
		plugins: [
			'karma-ng-scenario',
			'karma-firefox-launcher',
			'karma-chrome-launcher'
		],

		/**
		 * How to report, by default.
		 */
		reporters: 'dots',

		/**
		 * On which port should the browser connect, on which port is the test runner
		 * operating, and what is the URL path for the browser to use.
		 */
		port: 9020,
		runnerPort: 9102,

		/**
		 * Disable file watching by default.
		 */
		autoWatch: false,

		/**
		 * Run E2E tests once by default
		 */
		singleRun: true,

		/**
		 * The list of browsers to launch to test on. This includes only "Firefox" by
		 * default, but other browser names include:
		 * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
		 *
		 * Note that you can also use the executable name of the browser, like "chromium"
		 * or "firefox", but that these vary based on your operating system.
		 *
		 * You may also leave this blank and manually navigate your browser to
		 * http://localhost:9018/ when you're running tests. The window/tab can be left
		 * open and the tests will automatically occur there during the build. This has
		 * the aesthetic advantage of not launching a browser every time you save.
		 */
		browsers: [
			'Chrome'
		]
	});
};