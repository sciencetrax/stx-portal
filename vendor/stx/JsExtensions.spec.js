describe('JsExtensions', function () {
	describe('Date', function () {
		describe('addSeconds', function () {
			it("should add the specified about of seconds to the time", function () {
				expect(new Date("2013 1-1 0:0:0").addSeconds(10)).toBeCloseTo(new Date("2013 1-1 0:0:10"));
				expect(new Date("2013 1-1 0:0:10").addSeconds(-10)).toBeCloseTo(new Date("2013 1-1 0:0:0"));
			});
		});
		describe('getElapsedSeconds', function () {
			it("should use current time if no time specified", function () {
				expect(new Date().getElapsedSeconds()).toBeCloseTo(0);
			});
			it("should calculate difference in seconds from the specified time", function () {
				expect(new Date("2013 1-1 0:0:0").getElapsedSeconds(new Date("2013 1-1 0:0:10"))).toBe(10);
			});
		});
	});
	describe('String', function () {
		it("camelCase", function () {
			expect("".camelCase()).toBe('');
			expect('hello'.camelCase()).toBe('hello');
			expect('Hello'.camelCase()).toBe('hello');
		});
		it("format (static)", function () {
			expect(String.format('0: {0} 1: {1}', 0, 1)).toBe("0: 0 1: 1");
		});
		it("format (instance)", function () {
			expect('0: {0} 1: {1}'.format(0, 1)).toBe("0: 0 1: 1");
		});
		it("contains", function () {
			expect('abcdefg'.contains('bcd')).toBe(true);
			expect('abcdefg'.contains('bacd')).not.toBe(true);
		});
		it("endsWith", function () {
			expect('efgabcdefg'.endsWith('efg')).toBe(true);
			expect('abcdefg'.endsWith('efg')).toBe(true);
			expect('abcdefg'.endsWith('efga')).not.toBe(true);
		});
		it("startsWith", function () {
			expect('abcdefg'.startsWith('abc')).toBe(true);
			expect('abcdefg'.startsWith('b')).not.toBe(true);
		});
		it("insert", function () {
			expect('abcdefg'.insert(2, 'aaa')).toBe('abaaacdefg');
			expect('abcdefg'.insert(200, 'aaa')).toBe('abcdefgaaa');
		});
	});
	describe('UrlUtils', function () {
		describe('addParameter', function () {
			it('should add "?" when there are no parameters', function () {
				expect(UrlUtils.addParameter('http://localhost/index.html', 'test', 'value')).toBe('http://localhost/index.html?test=value');
			});
			it('should not add "?" when there is already a "?" and no parameters', function () {
				expect(UrlUtils.addParameter('http://localhost/index.html?', 'test', 'value')).toBe('http://localhost/index.html?test=value');
			});
			it('should not "&" when there is already a parameter and an "&" is specified', function () {
				expect(UrlUtils.addParameter('http://localhost/index.html?v1=v&', 'test', 'value')).toBe('http://localhost/index.html?v1=v&test=value');
			});
			it('should "&" when there is already a parameter and no "&" specified', function () {
				expect(UrlUtils.addParameter('http://localhost/index.html?v1=v', 'test', 'value')).toBe('http://localhost/index.html?v1=v&test=value');
			});
			it('should not add "=" when there is no value specified', function () {
				expect(UrlUtils.addParameter('http://localhost/index.html?v1=v&', 'test')).toBe('http://localhost/index.html?v1=v&test');
			});
		});
		describe('combine', function () {
			it('should return the first string when the second string is null or empty', function () {
				expect(UrlUtils.combine('a', null)).toBe('a');
				expect(UrlUtils.combine('a', '')).toBe('a');
			});
			it('should return the second string when the first string is null or empty', function () {
				expect(UrlUtils.combine(null, 'b')).toBe('b');
				expect(UrlUtils.combine('', 'b')).toBe('b');
			});
			it('should not prepend a "/" to the URL and should not append a "/" to the end', function () {
				expect(UrlUtils.combine('a', '')).toBe('a');
			});

			it('should insert a "/" between the two URLs', function () {
				expect(UrlUtils.combine('a', 'b')).toBe('a/b');
			});
			it('should not insert a "/" between the two URLs when the first string contains a trailing "/"', function () {
				expect(UrlUtils.combine('a/', 'b')).toBe('a/b');
			});
			it('should not insert a "/" between the two URLs when the second string contains a prepended "/"', function () {
				expect(UrlUtils.combine('a', '/b')).toBe('a/b');
			});
			it('should not insert a "/" between the two URLs when the first string contains a trailing "/" and second string contains a prepended "/"', function () {
				expect(UrlUtils.combine('a/', '/b')).toBe('a/b');
			});

			it('should combine two URLs with preceding and trailing "/"s without duplicating the "/"', function () {
				expect(UrlUtils.combine('/a/', '/b/')).toBe('/a/b/');
			});
		});
		describe('getHostAndPath', function () {
			it('should return the whole string since there is no querystring', function () {
				expect(UrlUtils.getHostAndPath('http://localhost/index.html')).toBe('http://localhost/index.html');
			});
			it('should remove the querystring', function () {
				expect(UrlUtils.getHostAndPath('http://localhost/index.html?querystring')).toBe('http://localhost/index.html');
			});
			it('should remove the location', function () {
				expect(UrlUtils.getHostAndPath('http://localhost/index.html#location')).toBe('http://localhost/index.html');
			});
			it('should remove the querystring and location', function () {
				expect(UrlUtils.getHostAndPath('http://localhost/index.html#/location?querystring')).toBe('http://localhost/index.html');
			});
		});
	});

});
