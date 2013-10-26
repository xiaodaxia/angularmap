var Here = function(appId, appCode, mapContainer, options) {
  this.appId = appId;
  this.appCode = appCode;
  this.mapContainer = mapContainer;
  this.router = new nokia.maps.routing.Manager();
  this.waypoints = new nokia.maps.routing.WaypointParameterList();

  this.routingOptions = {
    type: "shortest",
    transportModes: ["car"],
    options: ""
  };

  nokia.Settings.set("app_id", appId);
  nokia.Settings.set("app_code", appCode);
  nokia.Settings.set("serviceMode", "cit");

  this.map = new nokia.maps.map.Display(this.mapContainer, {
    center: [52.51, 13.4],
    zoomLevel: 10,
    components: [
      new nokia.maps.map.component.Behavior(),
      new nokia.maps.map.component.ZoomBar(),
      new nokia.maps.map.component.TypeSelector()
    ]
  });

  if (typeof(options) === "object" && options.whenMapIsReady) {
    this.map.addListener("displayready", options.whenMapIsReady, false);
  }
};

Here.prototype.createSearchBox = function(searchContainer, center, callback) {
  new nokia.places.widgets.SearchBox({
    targetNode: searchContainer,
    onResults: callback,
    searchCenter: function() {
      return center;
    }
  });
};

Here.prototype.clearMap = function() {
  this.map.objects.clear();
};

Here.prototype.displayPlaces = function(places) {
  var i,
      resultSet,
      length = places.length,
      markers = [];

  for (i=0; i < length; i++) {
    markers.push(this.__createMarker(places[i].position, i+1));
  }

  if (markers.length > 0) {
    resultSet = this.__createResultSet(markers);
    this.map.objects.add(resultSet);
    this.map.zoomTo(resultSet.getBoundingBox(), false);
  }
};

Here.prototype.createRoute = function(places) {
  var i,
      length = places.length,
      self = this;

  this.waypoints.clear();

  for (i=0; i < length; i++) {
    var coordinate = new nokia.maps.geo.Coordinate(places[i].position.latitude, places[i].position.longitude);
    this.waypoints.addCoordinate(coordinate);
  }

  this.router.calculateRoute(this.waypoints, this.routingOptions);
  this.router.addObserver("state", function(observedRouter, key, value) {
    self.__drawRoutes(observedRouter, key, value, self.map);
  });
};

Here.prototype.__drawRoutes = function(observedRouter, key, value, map) {
  var routes, mapRoute;

  if (value === "finished") {
    routes = observedRouter.getRoutes();
    mapRoute = new nokia.maps.routing.component.RouteResultSet(routes[0]).container;
    map.objects.add(mapRoute);
    map.zoomTo(mapRoute.getBoundingBox(), false, "default");
  }
}

Here.prototype.__createMarker = function(position, title) {
  return new nokia.maps.map.StandardMarker(position, { text: title });
};

Here.prototype.__createResultSet = function(markers) {
  var i,
      length = markers.length,
      resultSet = new nokia.maps.map.Container();

  for (i=0; i < length; i++) {
    resultSet.objects.add(markers[i]);
  }

  return resultSet;
};