describe('NavigableHash', function () {
	var ls = new NavigableHash({
		testData: {
			path: {
				to: {
					a: {
						aString: "AStringValue"
					}
				}
			}
		}
	});
	var en = {
		v1: "en-v1",
		l1: {
			v1: "en-l1-v1"
		}
	};
	var hash = new NavigableHash(en);
    it('should allow direct access to properties', function() {
       expect(hash.v1).toBe(en.v1);
    });
    it('should allow direct access to deep properties', function() {
       expect(hash.l1.v1).toBe(en.l1.v1);
    });
    it('get', function() {
       expect(hash.get('v1')).toBe(en.v1);
    });
    it('get() should return deep matches', function() {
       expect(hash.get('l1/v1')).toBe(en.l1.v1);
    });
	it('should have root for all nodes that are not strings', function () {
		expect(typeof (ls.testData.root)).toBe("object");
	});
	var spanishLocaleUrl = 'js/strings/locale_es-es.js';
	it('should have root that points back to the root', function () {
		expect(ls.testData.root.testData).toEqual(ls.testData);
	});
	it('should have get() for all nodes that are not strings', function () {
		expect(typeof (ls.testData.get)).toBe("function");
	});
	it('should return the resource when accessing the properties directly', function () {
		expect(ls.testData.path.to.a.aString).toEqual("AStringValue");
	});

	// GET
	describe("get()", function () {
		it('should thrown an exception when the path is not found', function () {
			expect(function () { ls.get("testData/path/that/does/not/exist"); })
				.toThrow("Error: Unable to find path: testData/path/that while looking up path: testData/path/that/does/not/exist.");
		});
		it('should return an empty string for get(undefined)', function () {
			expect(ls.get(undefined)).toBe('');
		});
		it('on child node should return the resource when using array', function () {
			expect(ls.testData.get(["path", "to", "a", "aString"])).toEqual("AStringValue");
		});
		it('should return the resource when using array', function () {
			expect(ls.get(["testData", "path", "to", "a", "aString"])).toEqual("AStringValue");
		});
		it('should return the resource when using a string path with forward slashes', function () {
			expect(ls.get("testData/path/to/a/aString")).toEqual("AStringValue");
		});
		it("should return the resource when using a string path with '.'s", function () {
			expect(ls.get("testData.path.to.a.aString")).toEqual("AStringValue");
		});
		it('should return the resource when using a string path with extra slashes', function () {
			expect(ls.get("testData///path///to///a///aString")).toEqual("AStringValue");
		});
		it('should return the resource when using a string path with trailing slashes', function () {
			expect(ls.get("testData/path/to/a/aString///")).toEqual("AStringValue");
		});
		it('should return the resource when using a string path with backslashes', function () {
			expect(ls.get("testData/path\\to/a\\aString")).toEqual("AStringValue");
		});
		it('should return the resource when using a string path and a name specified', function () {
			expect(ls.get("testData/path/to/a", "aString")).toEqual("AStringValue");
		});
	});
});
