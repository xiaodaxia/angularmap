var filters_module = angular.module("hereApp.filters", []);

filters_module.filter("truncate", function() {
  return function(text, length) {
    if (text.length > length) {
      return text.substr(0, length) + "...";
    } else {
      return text;
    }
  }
});

filters_module.filter("clean", function() {
  return function(text) {
    return text.split("<br/>").join(", ");
  }
});