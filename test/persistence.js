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
		it('is available', function() {
			expect(persistence).not.toBeUndefined();
			expect(persistence.isAvailable()).toEqual(true);
		});
		it('.load before .store returns null', function() {
			expect(persistence).not.toBeUndefined();
			expect(persistence.load()).toBeNull();
		});
		it('.store, .load', function() {
			expect(persistence).not.toBeUndefined();
			var data = 4;
			persistence.store(data);
			expect(persistence.load()).toEqual(data);
			persistence.store(null);
		});
	});
});