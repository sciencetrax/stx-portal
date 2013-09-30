var LOCALE = {
    appName: "StudyTRAX",

	errorMessages: {
		AccountLocked: "Your account has been locked.",
		EmailAddressNotVerified: "Your email address has not been verified.  You should have received an email with a link to click to verify your address.",
		InvalidUsernameOrPassword: "Invalid username or password.",
		NotAuthorizedToLoginSubject: "You are not authorized to log subjects in.",
		PasswordExpired: "Your password has expired.",
		RemainigSecondsTooLong: "The value you entered for remaining seconds exceeds the session length.",
		RequiredFieldMissing: "A required field was not specified."
	},
	menu: {
		logASubjectIn: "Log a subject in"
	},
	pages: {
        accounts: {
            login: {
                heading: "Login",
                username: "Username",
                password: "Password",
                login: "Login",
                enroll: "Enroll",
                register: "Sign up",
                forgotUsernameOrPassword: "Forgot your username or password?"
            },
            register: {
                heading: "Register",

                confirm: "Confirm",
                firstName: "First Name",
                lastName: "Last Name",
                middleInitial: "Middle Initial",
                password: "Password",
                username: "Username"
            },
            update: {
                heading: "Update Account"
            }
        },
        encounters: {
            view: {
                details: "Details",
                reports: "Reports"
            }
        },
        home: {
            summary: "Summary",
            details: "Details",
            profile: "Profile"
        },
        variableGroups: {
            update: {
                cancel: "Cancel",
                save: "Save"
            }
        }
	}
};

var LS = new NavigableHash(LOCALE);
