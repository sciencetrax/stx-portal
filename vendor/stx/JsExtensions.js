//////////////////////////////////////////////////////////////////
// Date
//////////////////////////////////////////////////////////////////
Date.prototype.getElapsedMilliseconds = function (date) {
	date = date == null ? new Date() : date;
	var elapsedTime = date.getTime() - this.getTime();
	return elapsedTime;
};
Date.prototype.getElapsedSeconds = function (date) {
	return parseInt(this.getElapsedMilliseconds(date) / 1000);
};
Date.prototype.addSeconds = function (seconds) {
	return new Date(this.getTime() + (seconds * 1000));
};

//////////////////////////////////////////////////////////////////
// String
//////////////////////////////////////////////////////////////////
String.isNullOrEmpty = function (str) {
    if (str === "" || str === null) {
        return true;
    }

    return false;
};
String.isNullEmptyOrUndefined = function (str) {
    if (str === undefined || str === "" || str === null) {
        return true;
    }

    return false;
};

// Utility method to provide string.Format type functionality in JavaScript.  This
// implementation was taken from MicrosoftAjax's String.Format
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

String.prototype.camelCase = function() {
	// I don't know why but for some reason, 'this' was being treated as an array.
	var value = "" + this;
	if (value.isEmpty()) {
		return value;
	}
	var character = value[0];
	if (character == character.toUpperCase()) {
		character = character.toLowerCase();
		if (value.length == 1) {
			return character;
		}
		return character + value.substring(1);
	}

	return value;
};

String.prototype.contains = function(str) {
    return this.indexOf(str) != -1;
};
String.prototype.endsWith = function (str) {
    if (String.isNullOrEmpty(str)) {
        return false;
    }
    return (this.lastIndexOf(str) === this.length - str.length);
};
String.prototype.format = function() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(this);
	return String.format.apply(undefined, args);
};
String.prototype.insert = function (index, str) {
    return this.substr(0, index) + str + this.substr(index);
};
String.prototype.isEmpty = function() {
	return this.length == 0;
}
String.prototype.startsWith = function (str) {
    return (this.indexOf(str) === 0);
};

var UrlUtils = {
	addParameter: function(url, name, value) {
		var parameter = name;
		if (!String.isNullEmptyOrUndefined(value)) {
			parameter += "=" + value;
		}
		if (url.endsWith('?')
			|| url.endsWith('&')) {
			return url + parameter;
		}
		if (!url.contains('?')) {
			return url + "?" + parameter;
		}

		return url + "&" + parameter;
	},
    combine: function (url1, url2) {
        if (String.isNullOrEmpty(url1)) {
            return url2;
        }
        if (String.isNullOrEmpty(url2)) {
            return url1;
        }

        if (url1.endsWith('/')) {
            url1 = url1.substring(0, url1.length - 1);
        }
        if (!url2.startsWith('/')) {
            url2 = '/' + url2;
        }
        return url1 + url2;
    },
	getHostAndPath: function(url) {
		var newUrl = url;
		if (url.contains('?')) {
			newUrl = url.substring(0, url.indexOf('?'));
		}
		if (url.contains('#')) {
			newUrl = url.substring(0, url.indexOf('#'));
		}

		return newUrl;
	}
}