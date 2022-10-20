[{
	constructor: 'Persistence_sessionStorage',
	generator: function() {
		return new Persistence_sessionStorage();
	}
},{
	constructor: 'Persistence_windowKey',
	generator: function() {
		var key = 'persistence';
		window[key] = {};
		return new Persistence_windowKey(key);
	}
}].forEach(function(args) {
	describe(args.constructor, function() {
		var persistence = args.generator();
		var data = [
			0,
			1,
			2.2,
			'3',
			{"value": 4},
			[1, 2, 3],
		];
		it('is available', function() {
			expect(persistence.isAvailable()).toEqual(true);
		});
		it('can get all keys', function() {
			for (var i = 0; i < 10; i++) {
				persistence.setItem(i, "value for " + i);
			}
			var keys = persistence.getAllKeys();
			expect(keys.length).toEqual(10)
			for (var i = 0; i < keys.length; i++) {
				expect(keys[i]).toEqual(i + "")
			}
			persistence.clear()
		});
		it('works without key', function() {
			expect(persistence.getItem()).toBeNull();
			persistence.removeItem();

			for (var i = 0; i < data.length; i++) {
				persistence.setItem(data[i]);
				expect(persistence.getItem()).toEqual(data[i]);
			}

			persistence.removeItem();
			expect(persistence.getItem()).toBeNull();

			persistence.setItem(data[0]);
			persistence.clear();
			expect(persistence.getItem()).toBeNull();
		});
		it('works with key', function() {
			for (var i = 0; i < data.length; i++) {
				expect(persistence.getItem('' + i)).toBeNull();
				persistence.removeItem('' + i); // shouldn't throw an error
			}

			for (var i = 0; i < data.length; i++) {
				persistence.setItem('' + i, data[i]);
				expect(persistence.getItem('' + i)).toEqual(data[i]);
				expect(persistence.getItem('' + i)).toBeNull(); // Added to check how GH Actions handle test failures
			}

			for (var i = 0; i < data.length; i++) {
				persistence.removeItem('' + i);
				expect(persistence.getItem('' + i)).toBeNull();
				persistence.setItem('' + i, data[i]);
			}
			persistence.clear();
			for (var i = 0; i < data.length; i++) {
				expect(persistence.getItem('' + i)).toBeNull();
			}
		});
	});
});
