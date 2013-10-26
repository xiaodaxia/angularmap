describe("Filters", function() {
  var truncate, clean;

  beforeEach(module("hereApp"));

  beforeEach(inject(function($filter) {
    truncate = $filter("truncate");
    clean = $filter("clean");
  }));

  describe("truncate", function() {
    describe("when the text length is > than the specified size", function() {
      it("truncates the text", function() {
        expect(truncate("my long text", 7)).toEqual("my long...");
      });
    });

    describe("when the text length is <= than the specified size", function() {
      it("returns the original text", function() {
        expect(truncate("small", 7)).toEqual("small");
      });
    });
  });

  describe("clean", function() {
    it("removes special content from the response", function() {
      expect(clean("Wollankstrasse<br/>10")).toEqual("Wollankstrasse, 10");
    });
  });
});