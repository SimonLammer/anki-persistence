// based on - https://github.com/SimonLammer/anki-persistence/blob/b375e17530377572fac7e9eeeb1bd977f34ac22d/script.js
if (typeof(window.Persistence) === 'undefined') {
  window.Persistence = new function() {
    var _persistenceKey = 'github.com/SimonLammer/anki-persistence';
    var _defaultKey = '_default';
    var _isAvailable = false;
    try {
      if (typeof(window.sessionStorage) === 'object') { // used in android
        _isAvailable = true;
        var forEachKey = function(f) {
          for (var i = 0, j = 0; i < sessionStorage.length; i++) {
            var k = sessionStorage.key(i);
            if (k.startsWith(_persistenceKey)) {
              f(k.substr(_persistenceKey.length), j);
            }
          }
        };
        this.clear = function() {
          forEachKey(function(k, i) {
            sessionStorage.removeItem(_persistenceKey + k);
          });
        };
        this.key = function(index) {
          forEachKey(function(k, i) {
            if (i == index) {
              return k;
            }
          });
          return null;
        };
        Object.defineProperty(this, 'length', {
          get: function() {
            var s = 0;
            forEachKey(function(k, i) {
              s++;
            });
            return s;
          }
        });
        this.setItem = function(key, data) {
          if (data == undefined) {
            data = key;
            key = _defaultKey;
          }
          sessionStorage.setItem(_persistenceKey + key, JSON.stringify(data));
        };
        this.getItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          return JSON.parse(sessionStorage.getItem(_persistenceKey + key));
        }
        this.removeItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          sessionStorage.removeItem(_persistenceKey + key);
        }
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
        var forEachKey = function(f) {
          var i = 0;
          for (var key in obj[_persistenceKey]) {
            f(key, i);
            i++;
          }
        }
        this.clear = function() {
          obj[_persistenceKey] = {};
        }
        this.key = function(index) {
          for (var key in obj[_persistenceKey]) {
            if (index == 0) {
              return key;
            }
            index--;
          }
          return null;
        }
        Object.defineProperty(this, 'length', {
          get: function() {
            var s = 0;
            forEachKey(function(k, i) {
              s++;
            });
            return s;
          }
        });
        this.setItem = function(key, data) {
          if (data == undefined) {
            data = key;
            key = _defaultKey;
          }
          obj[_persistenceKey][key] = data;
        };
        this.getItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          return obj[_persistenceKey][key] || null;
        };
        this.removeItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          delete obj[_persistenceKey][key];
        }

        if (obj[_persistenceKey] == undefined) {
          this.clear();
        }
      }
    }
    this.isAvailable = function() {
      return _isAvailable;
    };
  }();
}