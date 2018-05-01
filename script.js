window.Persistence = new function() {
  var _persistenceKey = 'github.com/SimonLammer/anki-persistence';
  var _isAvailable = false;
  try {
    if (typeof(window.sessionStorage) === 'object') {
      _isAvailable = true;
      this.store = function(data) {
        sessionStorage.setItem(_persistenceKey, JSON.stringify(data));
      };
      this.load = function() {
        return JSON.parse(sessionStorage.getItem(_persistenceKey));
      }
    }
  } catch(err) {}
  if (!_isAvailable) {
    try {
      if (typeof(window.py) === 'object') {
        _isAvailable = true;
        this.store = function(data) {
          py[_persistenceKey] = data;
        };
        this.load = function() {
          return py[_persistenceKey] || null;
        };
      }
    } catch(err) {}
  }
  this.isAvailable = function() {
    return _isAvailable;
  };
}();
