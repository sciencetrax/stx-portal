function NavigableHash(hashTable) {
	var _this = this;
	NavigableHash.prototype.findNode = function (rootNode, path, name) {
		// Convert a string path to an array.
		if (String.isNullEmptyOrUndefined(path)) {
			return "";
		}
		if (Object.prototype.toString.call(path) === '[object String]') {
			path = path.replace(/\\/g, '/');
			path = path.replace(/[.]/g, '/');
			path = path.split("/");
		}
		var newLS = rootNode;
		for (var index = 0; index < path.length; index++) {
			// We ignore blank nodes in the path
			if (path[index] === '') {
				continue;
			}
			newLS = newLS[path[index]];
			if (newLS == null) {
				var originalPath = path.join("/");
				var currentPath = path.splice(0, index + 1);
				throw Error("Unable to find path: " + currentPath.join("/") + " while looking up path: " + originalPath) + ".";
			}
		}
		if (name !== undefined) {
			newLS = newLS[name];
		}
		return newLS;
	};
	NavigableHash.prototype.setupChildNodes = function (root) {
		for (var key in root) {
			var node = root[key];
			if (typeof (node) === 'object'
				&& node.get === undefined) {
				var _this = this;
				node.root = _this;
				node.get = function (path, name) {
					return _this.findNode(this, path, name);
				};
				this.setupChildNodes(node);
			}
		}
	};

	NavigableHash.prototype.get = function (path, name) {
		return this.findNode(this, path, name);
	};
	if (hashTable) {
        for(var key in hashTable) {
            this[key] = hashTable[key];
        }
//		$.extend(true, this, hashTable);
	}
	this.setupChildNodes(this);
}
