if (typeof(window.Persistence) === 'undefined') {
  window.Persistence = new function() {
    var _persistenceKey = 'github.com/SimonLammer/anki-persistence';
    var _isAvailable = false;
    try { // used in android
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
    var persistentKeys = [
      "py", // used in windows client
      "qt"  // used in linux and mac
    ];
    for (var i = 0; !_isAvailable && i < persistentKeys.length; i++) {
      var obj = window[persistentKeys[i]];
      if (typeof(obj) === 'object') {
        _isAvailable = true;
        this.store = function(data) {
          obj[_persistenceKey] = data;
        };
        this.load = function() {
          return obj[_persistenceKey] || null;
        };
      }
    }
    this.isAvailable = function() {
      return _isAvailable;
    };
  }();
}