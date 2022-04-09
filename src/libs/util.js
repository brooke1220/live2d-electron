export function defaultsDeep(target) {
    target = target || {};
  
    function copy(target, current) {
      for (var key in current) {
        if (Object.prototype.hasOwnProperty.call(current, key)) {
          var value = current[key]
          if (key === '__proto__') {
            continue;
          }
          var val = target[key];

          // add the missing property, or allow a null property to be updated
          if (val == null) {
            target[key] = value;
          } else if (typeof val === 'object' && val !== null && typeof value === 'object' && value !== null) {
            defaultsDeep(val, value);
          }
        }
      }
    }
  
    var len = arguments.length, i = 0;
    while (i < len) {
      var obj = arguments[i++];
      if (obj) {
        copy(target, obj);
      }
    }
    return target;
}