describe("Here", function() {
  var appId = "abcd";
  var appCode = "1234";
  var mapContainer = "mapContainer";
  var here;

  var Behavior, ZoomBar, TypeSelector;

  beforeEach(function() {
    nokia.maps.map.component.Behavior = function() { return {} };
    nokia.maps.map.component.ZoomBar = function() { return {} };
    nokia.maps.map.component.TypeSelector = function() { return {} };

    spyOn(nokia.maps.map, "Display");
    spyOn(nokia.Settings, "set");
    spyOn(nokia.places.widgets, "SearchBox");
  });

  beforeEach(function() {
    here = new Here(appId, appCode, mapContainer);
  });

  describe("constructor", function() {
    describe("internal attributes", function() {
      it("sets appId", function() {
        expect(here.appId).toEqual(appId);
      });

      it("sets appCode", function() {
        expect(here.appCode).toEqual(appCode);
      });

      it("sets mapContainer", function() {
        expect(here.mapContainer).toEqual(mapContainer);
      });

      it("configures the default routing options", function() {
        expect(here.routingOptions).toEqual({
          type: "shortest",
          transportModes: ["car"],
          options: "",
        });
      });
    });

    describe("nokia.Settings", function() {
      it("sets appId", function() {
        expect(nokia.Settings.set).toHaveBeenCalledWith("app_id", appId);
      });

      it("sets appCode", function() {
        expect(nokia.Settings.set).toHaveBeenCalledWith("app_code", appCode);
      });
    });

    describe("map creation", function() {
      it("creates the map", function() {
        expect(nokia.maps.map.Display).toHaveBeenCalledWith(mapContainer, {
          center: [52.51, 13.4],
          zoomLevel: 10,
          components: [{}, {}, {}]
        });
      });
    });
  });

  describe("createSearchBox", function() {
    it("creates the widget", function() {
      var searchContainer = "search";
      var callback = function(data) {};
      var center = {latitude: 1, longitude: 0};

      here.createSearchBox(searchContainer, center, callback);
      expect(nokia.places.widgets.SearchBox).toHaveBeenCalledWith({
        targetNode: searchContainer,
        onResults: callback,
        searchCenter: jasmine.any(Function)
      });
    });
  });

  describe("clearMap", function() {
    it("removes all objects from map", function() {
      here.map = {
        objects: {
          clear: function() {}
        }
      }

      spyOn(here.map.objects, 'clear');
      here.clearMap();
      expect(here.map.objects.clear).toHaveBeenCalled();
    });
  });

  describe("displayPlaces", function() {
    var places;

    beforeEach(function() {
      places = [{
        position: {latitude: 1, longitude: 0}
      }]

      here.map = {
        zoomTo: function() {},

        objects: {
          add: function() {}
        }
      };

      here.__createMarker = function(position, title) {
        return {position: position, title: title};
      };

      here.__createResultSet = function(markers) {
        return {
          resultSet: markers,
          getBoundingBox: function() {
            return "BoundingBox";
          }
        };
      }

      spyOn(here.map.objects, "add");
    });

    it("adds the places to the map", function() {
      here.displayPlaces(places);
      expect(here.map.objects.add).toHaveBeenCalledWith({
        resultSet: [{ position : { latitude : 1, longitude : 0 }, title : 1 }],
        getBoundingBox : jasmine.any(Function) });
    });
  });

  describe("createRoute", function() {
  });
});