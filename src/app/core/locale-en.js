var LOCALE = {
    appName: "StudyTRAX",

	errorMessages: {
		AccountLocked: "Your account has been locked.",
		EmailAddressNotVerified: "Your email address has not been verified.",
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
        account: {
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
            register: "Register"
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
