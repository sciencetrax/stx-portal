var LOCALE = {
	appName: "StudyTRAX",

	common: {
		errors: {
			required: "Required",
			confirmPasswordValueMatches: "Does not match password.",
			emailAddressEmail: "Invalid email address.",
			emailAddressValueMatches: "Does not match Email Address."
		},
		actions: "Actions",
		back: "Back",
		cancel: "Cancel",
		logASubjectIn: "Log a subject in",
		login: "Login",
		newText: "New",
		no: "No",
		renew: "Renew",
		resendUnlockAccountEmail: "Resend Unlock Email",
		resendVerificationEmail: "Resend Email",
		returnToLoginPage: "Return To Login Page",
		save: "Save",
		sessionExpirationWarning: "Your session is about to expire.  Click the renew button below to renew.",
		submit: "Submit",
		verificationEmailSent: "An email has been sent.  If you do not receive the email shortly, please check your SPAM folder.  Please click the link in the email to verify your address.",
		yes: "Yes"
	},

	errorMessages: {
		AccountLocked: "Your account has been locked.",
		AnonymousDataEntryNotAllowed: "Anonymous data entry is not allowed.",
		ConcurrencyError: "Concurrency Error: The most likely reason for this is that another user changed data since the time you queried this record.",
		EmailAddressNotVerified: "Your email address has not been verified.  You should have received an email with a link to click to verify your address.",
		EnrollmentFull: "Sorry, but the project is full.  No more subjects can sign up at this time.",
		EnrollmentIntervalNotConfigured: "The enrollment interval has not been setup",
		InvalidPassword: "Invalid password.",
		InvalidUsernameOrPassword: "Invalid username or password.",
		NotAuthorizedToLoginSubject: "You are not authorized to log subjects in.",
		PasswordCannotReuse: "That password cannot be reused yet.",
		PasswordExpired: "Your password has expired.",
		PasswordMinLength: "Your password must be at least {minimumPasswordLength} characters long.",
		PasswordNotDifferent: "The new password must be different from the old password.",
		RemainingSecondsTooLong: "The value you entered for remaining seconds exceeds the session length.",
		RequiredFieldMissing: "A required field was not specified.",
		UsernameExist: "Please enter a different username.  That username ({username}) is taken.",
		SqlCheckConstraint: "The value for field ({column}) in table ({table}) fails constraint ({value}).",
		SqlDataInUse: "This record cannot be deleted because it is referenced by another record in the system.",
		SqlDuplicateKey: "The value ({value}) for ({column,}) in entity ({table}) must be unique.",
		SqlDuplicatePrimaryKey: "Concurrency Error: The most likely reason for this is that another user added data since the time you queried this record (table: ({table}), value: ({value}).",
		SqlForeignKeyDeleteViolation: "This record ({table}) cannot be deleted because it is referenced by a ({foreignKeyTable}) record.",
		SqlForeignKeyViolation: "This record ({table}) must have a corresponding reference to a ({foreignKeyTable}) record.",
		SqlGenericError: "Unexpected database error.",
		SqlInvalidData: "The data was invalid.",
		SqlInvalidDataForType: "The value ({value}) is not in the correct form for its data type.",
		SqlNullInNotNullField: "This record ({table}) must have a value for ({column})."
	},
	menu: {
		logASubjectIn: "Log a subject in"
	},
	pages: {
		accounts: {
			changePassword: {
				heading: "Change Password",
				confirmPassword: "Confirm Password",
				newPassword: "New Password",
				password: "Password"
			},
			accountUnlocked: {
				heading: "Account Unlocked",
				message: "Your account has been unlocked."
			},
			emailAddressVerified: {
				heading: "Email Address Verified",
				message: "Your email address has been verified."
			},
			enroll: {
				heading: "Enroll"
			},
			failedEnrollment: {
				message: "Thank you for taking the survey. Unfortunately, you do not meet the requirements to enroll in this study."
			},
			login: {
				heading: "Login",
				enroll: "Enroll",
				forgotUsernameOrPassword: "Forgot username / password",
				loggingIn: "Logging In...",
				login: "Login",
				password: "Password",
				referenceId: "Reference ID",
				register: "Sign up",
				username: "Username"
			},
			register: {
				heading: "Account Information",
				confirmEmailAddress: "Confirm Email Address",
				confirmPassword: "Confirm Password",
				emailAddress: "Email Address",
				firstName: "First Name",
				lastName: "Last Name",
				middleInitial: "Middle Initial",
				password: "Password",
				signUp: "Sign Up",
				username: "Username"
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
			setPasswordAfterVerify: {
				heading: "Set Password",
				addPassword: "Add Password",
				confirmPassword: "Confirm Password",
				message: "Your email address has been verified but you still need to add a password.  Please enter your password below",
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
			},
			view: {
				heading: "Account",
				attributes: "Attributes",
				background: "Background",
				changePassword: "Change Password",
				edit: "Edit",
				emailAddress: "Email Address",
				name: "Name",
				username: "Username"
			}
		},
		encounters: {
			list: {
				heading: "History",

				all: "All",
				incomplete: "Incomplete"
			},
			view: {
				attributes: "Attributes",
				created: "Created",
				due: "Due",
				editUntil: "Edit Until",
				forms: "Forms",
				reports: "Reports"
			}
		},
		finished: {
			message: "Thank you for taking the survey."
		},
		home: {
			index: {
				heading: "Home",
				incomplete: "Incomplete",
				noIncompleteData: "There doesn't appear to be any incomplete data that needs to be collected.",
				recentlyCompleted: "Recently Completed",
				reports: "Reports"
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
			}
		},
		reports: {
			view: {
				pdf: "PDF"
			}
		},
		variableGroups: {
			update: {
				clearAnswer: "Clear Answer",
				variablePanelOptionsHeading: "Options for"
			}
		}
	}
};

var LS = new NavigableHash(LOCALE);
String.LS = LS;