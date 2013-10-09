var LOCALE = {
	appName: "StudyTRAX",

	common: {
		_new: "New",
		actions: "Actions",
		cancel: "Cancel",
//		loading: "Loading...",
		logASubjectIn: "Log a subject in",
		resendVerificationEmail: "Resend Email",
		returnToLoginPage: "Return To Login Page",
		save: "Save",
		submit: "Submit",
		verificationEmailSent: "An email has been sent.  If you do not receive the email shortly, please check your SPAM folder.  Please click the link in the email to verify your address."
	},

	errorMessages: {
		AccountLocked: "Your account has been locked.",
		EmailAddressNotVerified: "Your email address has not been verified.  You should have received an email with a link to click to verify your address.",
		EnrollmentFull: "Sorry, but the project is full.  No more subjects can sign up at this time.",
		EnrollmentIntervalNotConfigured: "The enrollment interval has not been setup",
		InvalidUsernameOrPassword: "Invalid username or password.",
		NotAuthorizedToLoginSubject: "You are not authorized to log subjects in.",
		PasswordExpired: "Your password has expired.",
		PasswordNotDifferent: "The new password must be different from the old password.",
		RemainigSecondsTooLong: "The value you entered for remaining seconds exceeds the session length.",
		RequiredFieldMissing: "A required field was not specified.",
		UsernameExist: "Please enter a different username.  That username is taken."
	},
	menu: {
		logASubjectIn: "Log a subject in"
	},
	pages: {
		accounts: {
			emailAddressVerified: {
				heading: "Email Address Verified",
				message: "Your email address has been verified."
			},
			enroll: {

			},
			resetPassword: {
				heading: "Reset Password",
				changePassword: "Change Password",
				confirmPassword: "Confirm Password",
				password: "Password",
				passwordChangedMessage: "Your password has been changed.  Please return to the login page to login.",
				username: "Username",
				errors: {
					confirmPasswordValueMatches: "Does not match password."
				}
			},
			update: {
				heading: "Update Account",
				emailAddress: "Email Address",
				firstName: "First Name",
				lastName: "Last Name",
				middleInitial: "Middle Initial",
				username: "Username"
			}
		},
		common: {
			waiting: {
			}
		},
		encounters: {
			view: {
				details: "Details",
				reports: "Reports"
			}
		},
		home: {
			index: {
				summaryTab: "Summary",
				detailsTab: "Details",
				summary: {
					heading: "Action Items"
				},
				details: {
					schedule: "Schedule",
					addEncounter: "Add {0}"
				}
			}
		},
		login: {
			emailSent: {
				heading: "Email Sent",
				returnToLoginPage: "Return to Login Page"
			},
			forgot: {
				heading: "Forgot Username / Password",
				emailAddress: "Email Address",
				forgotPassword: "Forgot Password",
				forgotPasswordMessage: "Please enter the username and a link will be emailed to the address on file that will allow you to reset your password.",
				forgotUsername: "Forgot Username",
				forgotUsernameMessage: "Please enter the email address and a your username will be emailed to the specified address.",
				username: "Username",
				errors: {
					emailAddressEmail: "Invalid email address."
				}
			},
			login: {
				heading: "Login",
				enroll: "Enroll",
				forgotUsernameOrPassword: "Forgot username / password",
				loggingIn: "Logging In...",
				login: "Login",
				password: "Password",
				register: "Sign up",
				username: "Username"
			},
			register: {
				heading: "Register",
				confirmEmailAddress: "Confirm Email Address",
				confirmPassword: "Confirm Password",
				emailAddress: "Email Address",
				firstName: "First Name",
				lastName: "Last Name",
				middleInitial: "Middle Initial",
				password: "Password",
				signUp: "Sign Up",
				username: "Username",
				errors: {
					confirmPasswordValueMatches: "Does not match password.",
					emailAddressEmail: "Invalid email address.",
					emailAddressValueMatches: "Does not match Email Address."
				}
			}
		},
		reports: {
			view: {
				pdf: "PDF"
			}
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
