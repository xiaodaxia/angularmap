var controllers_module = angular.module("hereApp.controllers", []);

controllers_module.controller("SearchCtrl", function SearchCtrl($scope) {
  $scope.places = [];
  $scope.intinerary = [];
  $scope.transportMode = "car";

  $scope.updatePlaces = function(places) {
    $scope.places = places;
  };

  $scope.addToIntinerary = function(place) {
    $scope.places = [];
    $scope.intinerary.push(place);
    $scope.here.clearMap();
  };

  $scope.removeFromIntinerary = function(place) {
    var index = $scope.intinerary.indexOf(place);

    if (index >= 0) {
      $scope.intinerary.splice(index, 1);
    }
  };

  $scope.moveUp = function(place) {
    var previousPlace;
    var index = $scope.intinerary.indexOf(place);

    if (index > 0) {
      previousPlace = $scope.intinerary[index - 1];
      $scope.intinerary[index - 1] = place;
      $scope.intinerary[index] = previousPlace;
    }
  };

  $scope.isInIntinerary = function(place) {
    return $scope.intinerary.indexOf(place) >= 0;
  };

  $scope.changeTransport = function(transportMode) {
    if ($scope.here.routingOptions.transportModes[0] !== transportMode) {
      $scope.here.routingOptions.transportModes = [transportMode];
      $scope.transportMode = transportMode;
    }
  };

  $scope.createRoute = function() {
    $scope.here.clearMap();
    $scope.here.createRoute($scope.intinerary);
  };
});