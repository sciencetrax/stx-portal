/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'dist',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js_ordered: [
            'src/app/common/script/baseController.js',
            'src/**/authorizedBaseController.js'
        ],
        js: [
            'src/**/*.js',
            '!src/**/*.spec.js',
            '!src/**/*.fixture.js',
            '!src/**/*.scenario.js',
            '!src/assets/**/*.js'
        ],
        jsunit: [
			'src/**/*.spec.js',
			'vendor/stx/**/*.spec.js'
		],

		jsfixture: [ 'src/**/*.fixture.js' ],
		jsscenario: [ 'src/**/*.scenario.js' ],

		atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        less: [
			'src/less/main.less'
		]
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js',
            'vendor/stx/bootbox-mock.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            'vendor/jquery/jquery.js',
            'vendor/jquery-form/jquery.form.js',
            'vendor/jquery-ui/ui/jquery-ui.js',

            'vendor/angular/angular.js',
            'vendor/angular-bootstrap/ui-bootstrap.js',
            'vendor/angular-cookies/angular-cookies.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
			'vendor/angular-ui-utils/modules/validate/validate.js',
            'vendor/bootbox/bootbox.js',

			'vendor/bootstrap/assets/js/html5shiv.js',
			'vendor/bootstrap/assets/js/respond.min.js',
            'vendor/bootstrap/dist/js/bootstrap.js',

            'vendor/moment/min/moment-with-langs.js',
            'vendor/toastr/toastr.js',

            'vendor/stx/Class.js',
            'vendor/stx/jsExtensions.js',
            'vendor/stx/navigableHash.js',
            'vendor/stx/baseController.js',
            'vendor/stx/authorizedBaseController.js',
            'vendor/stx/*.js',
            '!vendor/stx/bootbox-mock.js',
            '!vendor/stx/*.spec.js'
        ],
        jsunit:  [
            'vendor/stx/**/*.spec.js'
        ],
        css: [
		],
        assets: [
			'vendor/bootstrap/fonts/**/*.*',
		]
    }
};
