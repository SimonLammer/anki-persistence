if (typeof(window.Persistence) === 'undefined') {
  window.Persistence = new function() {
    var _persistenceKey = 'github.com/SimonLammer/anki-persistence';
    var _defaultKey = '_default';
    var _isAvailable = false;
    var self = this;
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
        self.clear = function() {
          forEachKey(function(k, i) {
            sessionStorage.removeItem(_persistenceKey + k);
          });
        };
        self.key = function(index) {
          forEachKey(function(k, i) {
            if (i == index) {
              return k;
            }
          });
          return null;
        };
        Object.defineProperty(self, 'length', {
          get: function() {
            var s = 0;
            forEachKey(function(k, i) {
              s++;
            });
            return s;
          }
        });
        self.setItem = function(key, data) {
          if (data == undefined) {
            data = key;
            key = _defaultKey;
          }
          sessionStorage.setItem(_persistenceKey + key, JSON.stringify(data));
        };
        self.getItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          return JSON.parse(sessionStorage.getItem(_persistenceKey + key));
        }
        self.removeItem = function(key) {
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
        self.clear = function() {
          obj[_persistenceKey] = {};
        }
        self.key = function(index) {
          for (var key in obj[_persistenceKey]) {
            if (index == 0) {
              return key;
            }
            index--;
          }
          return null;
        }
        Object.defineProperty(self, 'length', {
          get: function() {
            var s = 0;
            forEachKey(function(k, i) {
              s++;
            });
            return s;
          }
        });
        self.setItem = function(key, data) {
          if (data == undefined) {
            data = key;
            key = _defaultKey;
          }
          obj[_persistenceKey][key] = data;
        };
        self.getItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          return obj[_persistenceKey][key] || null;
        };
        self.removeItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          delete obj[_persistenceKey][key];
        }

        if (obj[_persistenceKey] == undefined) {
          self.clear();
        }
      }
    }
    this.isAvailable = function() {
      return _isAvailable;
    };
  }();
}