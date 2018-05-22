if (typeof(window.Persistence) === 'undefined') {
  var _persistenceKey = 'github.com/SimonLammer/anki-persistence/';
  var _defaultKey = '_default';
  window.Persistence_sessionStorage = function() { // used in android
    var isAvailable = false;
    try {
      if (typeof(window.sessionStorage) === 'object') {
        isAvailable = true;
        this.clear = function() {
          for (var i = 0; i < sessionStorage.length; i++) {
            var k = sessionStorage.key(i);
            if (k.indexOf(_persistenceKey) == 0) {
              sessionStorage.removeItem(k);
              i--;
            }
          };
        };
        this.key = function(index) {
          for (var i = 0, j = 0; i < sessionStorage.length; i++) {
            var k = sessionStorage.key(i);
            if (k.indexOf(_persistenceKey) == 0) {
              if (j == index) {
                return k.substr(_persistenceKey.length);
              }
              j++;
            }
          };
          return null;
        };
        Object.defineProperty(this, 'length', {
          get: function() {
            var s = 0;
            for (var i = 0; i < sessionStorage.length; i++) {
              if (sessionStorage.key(i).indexOf(_persistenceKey) == 0) {
                s++;
              }
            }
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
        };
        this.removeItem = function(key) {
          if (key == undefined) {
            key = _defaultKey;
          }
          sessionStorage.removeItem(_persistenceKey + key);
        };
      }
    } catch(err) {}
    this.isAvailable = function() {
      return isAvailable;
    };
  };
  window.Persistence_windowKey = function(persistentKey) {
    var obj = window[persistentKey];
    var isAvailable = false;
    if (typeof(obj) === 'object') {
      isAvailable = true;
      var forEachKey = function(f) {
        var i = 0;
        for (var key in obj[_persistenceKey]) {
          var r = f(key, i);
          if (r != undefined) {
            return r;
          }
          i++;
        }
      };
      this.clear = function() {
        obj[_persistenceKey] = {};
      };
      this.key = function(index) {
        var i = 0;
        for (var key in obj[_persistenceKey]) {
          if (index == i) {
            return key;
          }
          i++;
        }
        return null;
      };
      Object.defineProperty(this, 'length', {
        get: function() {
          var s = 0;
          for (var key in obj[_persistenceKey]) {
            s++;
          }
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
      };

      if (obj[_persistenceKey] == undefined) {
        this.clear();
      }
    }
    this.isAvailable = function() {
      return isAvailable;
    };
  };
  var persistentKeys = [
    "py", // used in windows
    "qt"  // used in linux, mac and iOS
  ];
  for (var i = 0; i < persistentKeys.length; i++) {
    window.Persistence = new Persistence_windowKey(persistentKeys[i]);
    if (window.Persistence.isAvailable()) {
      break;
    }
  }
  if (!window.Persistence.isAvailable()) {
    window.Persistence = new Persistence_sessionStorage();
  }
}