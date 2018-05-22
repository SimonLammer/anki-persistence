if (typeof(window.Persistence) === 'undefined') {
  var _persistenceKey = 'github.com/SimonLammer/anki-persistence';
  window.Persistence_sessionStorage = function() { // used in android
    var isAvailable = false;
    try {
      if (typeof(window.sessionStorage) === 'object') {
        isAvailable = true;
        this.store = function(data) {
          sessionStorage.setItem(_persistenceKey, JSON.stringify(data));
        };
        this.load = function() {
          return JSON.parse(sessionStorage.getItem(_persistenceKey));
        }
      }
    } catch(err) {}
    this.isAvailable = function() {
      return isAvailable;
    }
  };
  window.Persistence_windowKey =  function(persistentKey) {
    var obj = window[persistentKey];
    var isAvailable = false;
    if (typeof(obj) === 'object') {
      isAvailable = true;
      this.store = function(data) {
        obj[_persistenceKey] = data;
      };
      this.load = function() {
        return obj[_persistenceKey] || null;
      };
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