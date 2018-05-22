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
			1,
			2.2,
			'3',
			{"value": 4}
		];
		it('is available', function() {
			expect(persistence.isAvailable()).toEqual(true);
		});
		it('works without key', function() {
			expect(persistence.getItem()).toBeNull();
			expect(persistence.length).toEqual(0);
			persistence.removeItem();

			for (var i = 0; i < data.length; i++) {
				persistence.setItem(data[i]);
				expect(persistence.getItem()).toEqual(data[i]);
				expect(persistence.length).toEqual(1);
				expect(persistence.key(0)).not.toBeNull();
			}
			
			persistence.removeItem();
			expect(persistence.getItem()).toBeNull();
			expect(persistence.length).toEqual(0);
			expect(persistence.key(0)).toBeNull();

			persistence.setItem(data[0]);
			persistence.clear();
			expect(persistence.getItem()).toBeNull();
			expect(persistence.length).toEqual(0);
		});
		it('works with key', function() {
			expect(persistence.length).toEqual(0);
			for (var i = 0; i < data.length; i++) {
				expect(persistence.getItem('' + i)).toBeNull();
			}
			expect(persistence.length).toEqual(0);
			for (var i = 0; i < data.length; i++) {
				persistence.removeItem('' + i);
			}

			for (var i = 0; i < data.length; i++) {
				persistence.setItem('' + i, data[i]);
				expect(persistence.getItem('' + i)).toEqual(data[i]);
				expect(persistence.length).toEqual(i + 1);
				expect(persistence.key(i)).not.toBeNull();
			}
			
			for (var i = data.length - 1; i >= 0; i--) {
				persistence.removeItem('' + i);
				expect(persistence.length).toEqual(i);
				expect(persistence.key(i)).toBeNull();
			}
			for (var i = 0; i < data.length; i++) {
				expect(persistence.getItem('' + i)).toBeNull();
			}

			for (var i = 0; i < data.length; i++) {
				persistence.setItem('' + i, data[i]);
			}
			persistence.clear();
			for (var i = 0; i < data.length; i++) {
				expect(persistence.getItem('' + i)).toBeNull();
			}
			expect(persistence.length).toEqual(0);
		});
	});
});