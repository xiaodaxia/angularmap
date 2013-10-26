describe("Controllers", function() {
  var $scope;
  var scope;
  var ctrl;
  var here;

  beforeEach(module("hereApp"));

  beforeEach(function() {
    here = {
      clearMap: function() {},

      routingOptions: {
        transportModes: ["car"]
      }
    };
  });

  describe("SearchCtrl", function() {
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller("SearchCtrl", {$scope: scope});
      scope.here = here;
    }));

    describe("updatePlaces", function() {
      it("updates the place list", function() {
        var places = [1, 2, 3];

        scope.updatePlaces(places);
        expect(scope.places).toEqual(places);
      });
    });

    describe("addToIntinerary", function() {
      var place;

      beforeEach(function() {
        place = "Alexanderplatz";
        scope.places = [place];
        scope.intinerary = [];
        spyOn(here, 'clearMap');

        scope.addToIntinerary(place);
      });

      it("adds a new place to intinerary", function() {
        expect(scope.intinerary).toEqual([place]);
      });

      it("clears the map", function() {
        expect(scope.here.clearMap).toHaveBeenCalled();
      });

      it("clear the places list", function() {
        expect(scope.places.length).toEqual(0);
      });
    });

    describe("removeFromIntinerary", function() {
      it("remove a place from intinerary", function() {
        var place1 = "Alexanderplatz";
        var place2 = "Wollankstrasse";

        scope.intinerary = [place1, place2];
        scope.removeFromIntinerary(place1);
        expect(scope.intinerary).toEqual([place2]);
      });
    });

    describe("moveUp", function() {
      var place1 = "Alexanderplatz";
      var place2 = "Wollankstrasse";

      beforeEach(function() {
        scope.intinerary = [place1, place2];
      });

      describe("when moving a valid place", function() {
        it("moves the place up", function() {
          scope.moveUp(place2);
          expect(scope.intinerary).toEqual([place2, place1]);
        });
      });

      describe("when trying to move the first place", function() {
        it("does not move places", function() {
          scope.moveUp(place1);
          expect(scope.intinerary).toEqual([place1, place2]);
        });
      });
    });

    describe("isInIntinerary", function() {
      var place = "Alexanderplatz";

      beforeEach(function() {
        scope.intinerary = [place];
      });

      describe("when the place is in the intinerary", function() {
        it("it is true", function() {
          expect(scope.isInIntinerary(place)).toBeTruthy();
        });
      });

      describe("when the place is not in the intinerary", function() {
        it("it is false", function() {
          expect(scope.isInIntinerary("Uruguaiana")).toBeFalsy();
        });
      });
    });

    describe("changeTransport", function() {
      it("changes the transport", function() {
        scope.changeTransport("pedestrian");
        expect(scope.here.routingOptions.transportModes).toEqual(["pedestrian"]);
      });
    });
  });
});