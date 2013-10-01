var LOCALE = {
    appName: "StudyTRAX",

	errorMessages: {
		AccountLocked: "Your account has been locked.",
		EmailAddressNotVerified: "Your email address has not been verified.  You should have received an email with a link to click to verify your address.",
		EnrollmentFull: "Sorry, but the project is full.  No more subjects can sign up at this time.",
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
                enroll: "Enroll",
                forgotUsernameOrPassword: "Forgot username / password",
                login: "Login",
                password: "Password",
                register: "Sign up",
                resendVerificationEmail: "Resend Email",
                username: "Username",
                verificationEmailSent: "An email has been sent.  If you do not receive the email shortly, please check your SPAM folder.  Please click the link in the email to verify your address."
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
