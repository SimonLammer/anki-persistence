if (typeof(window.Persistence) === 'undefined') {
  var _persistenceKey = 'github.com/SimonLammer/anki-persistence/';
  var _defaultKey = '_default';
  window.Persistence_sessionStorage = function() { // used in android, iOS, web
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
        this.setItem = function(key, value) {
          if (value == undefined) {
            value = key;
            key = _defaultKey;
          }
          sessionStorage.setItem(_persistenceKey + key, JSON.stringify(value));
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
  window.Persistence_windowKey = function(persistentKey) { // used in windows, linux, mac
    var obj = window[persistentKey];
    var isAvailable = false;
    if (typeof(obj) === 'object') {
      isAvailable = true;
      this.clear = function() {
        obj[_persistenceKey] = {};
      };
      this.setItem = function(key, value) {
        if (value == undefined) {
          value = key;
          key = _defaultKey;
        }
        obj[_persistenceKey][key] = value;
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
  /*
   *   client  | sessionStorage | persistentKey | useful location |
   * ----------|----------------|---------------|-----------------|
   * web       |       YES      |       -       |       NO        |
   * windows   |       NO       |       py      |       NO        |
   * android   |       YES      |       -       |       NO        |
   * linux 2.0 |       NO       |       qt      |       YES       |
   * linux 2.1 |       NO       |       qt      |       YES       |
   * mac 2.0   |       NO       |       py      |       NO        |
   * mac 2.1   |       NO       |       qt      |       YES       |
   * iOS       |       YES      |       -       |       NO        |
   */
  window.Persistence = new Persistence_sessionStorage(); // android, iOS, web
  if (!Persistence.isAvailable()) {
    window.Persistence = new Persistence_windowKey("py"); // windows, mac (2.0)
  }
  if (!Persistence.isAvailable()) {
    var titleStartIndex = window.location.toString().indexOf('title'); // if titleStartIndex > 0, window.location is useful
    var titleContentIndex = window.location.toString().indexOf('main', titleStartIndex);
    if (titleStartIndex > 0 && titleContentIndex > 0 && (titleContentIndex - titleStartIndex) < 10) {
      window.Persistence = new Persistence_windowKey("qt"); // linux, mac (2.1)
    }
  }
}