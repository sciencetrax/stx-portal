// These codes and names were taken from the twitter API Docs at:
// https://dev.twitter.com/docs/error-codes-responses
var HttpStatusCodes = {
	// Success!
	ok: 200,
	// There was no new data to return.
	notModified: 304,
	//The request was invalid. An accompanying error message will explain 
	// why. This is the status code will be returned during version 1.0 
	// rate limiting. In API v1.1, a request without authentication is 
	// considered invalid and you will get this response.
	badRequest: 400,
	//Authentication credentials were missing or incorrect.
	unauthorized: 401,
	// The request is understood, but it has been refused or access is 
	// not allowed. An accompanying error message will explain why. This 
	// code is used when requests are being denied due to update limits.
	forbidden: 403,
	// The URI requested is invalid or the resource requested, such as 
	// a user, does not exists. Also returned when the requested format 
	// is not supported by the requested method.
	notFound: 404,
	// Returned by the Search API when an invalid format is specified 
	// in the request.
	notAcceptable: 406,
	//This resource is gone. Used to indicate that an API endpoint has 
	// been turned off. For example: "The Twitter REST API v1 will soon 
	// stop functioning. Please migrate to API v1.1."
	gone: 410,
	// Returned by the version 1 Search and Trends APIs when you are 
	// being rate limited.
	enhanceYourCalm: 420,
	// Returned when an image uploaded to POST accounts/update_profile_banner
	// is unable to be processed.
	unprocessableEntity: 422,
	// Returned in API v1.1 when a request cannot be served due to the 
	// application's rate limit having been exhausted for the resource. 
	// See Rate Limiting in API v1.1.
	tooManyRequests: 429,
	// Something is broken. Please post to the group so the Twitter 
	// team can investigate.
	internalServerError: 500,
	// Twitter is down or being upgraded.
	badGateway: 502,
	// The Twitter servers are up, but overloaded with requests. Try 
	// again later.
	serviceUnavailable: 503,
	// The Twitter servers are up, but the request couldn't be serviced 
	// due to some failure within our stack. Try again later.
	gatewayTimeout: 504
};
