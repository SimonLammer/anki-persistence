// based on - https://github.com/SimonLammer/anki-persistence/blob/b375e17530377572fac7e9eeeb1bd977f34ac22d/script.js
if (typeof(window.Persistence) === 'undefined') {
  window.Persistence = new function() {
    var _persistenceKey = 'github.com/SimonLammer/anki-persistence/';
    var _isAvailable = false;
    try { // used in android
      if (typeof(window.sessionStorage) === 'object') {
        _isAvailable = true;
        this.store = function(data) {
          sessionStorage.setItem(_persistenceKey, JSON.stringify(data));
        };
        this.load = function() {
          return JSON.parse(sessionStorage.getItem(_persistenceKey));
        };
        this.getItem = function(key) {
          return JSON.parse(sessionStorage.getItem(_persistenceKey + key));
        };
        this.setItem = function(key, val) {
          sessionStorage.setItem(_persistenceKey + key, JSON.stringify(val));
        };
        this.removeItem = function(key) {
          sessionStorage.removeItem(_persistenceKey + key);
        };
      }
    } catch(err) {}
    var persistentKeys = [
      "py", // used in windows
      "qt"  // used in linux, mac and iOS
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
        this.getItem = function(key) {
          return obj[_persistenceKey + key];
        };
        this.setItem = function(key, val) {
          obj[_persistenceKey + key] = val;
        };
        this.removeItem = function(key) {
          delete obj[_persistenceKey + key];
        };
      }
    }
    this.isAvailable = function() {
      return _isAvailable;
    };
  }();
}