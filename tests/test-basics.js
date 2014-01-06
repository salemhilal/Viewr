describe("Viewer, at the very least,", function() {

  // Jasmine, are you there?
  it("should be able to be tested", function() {
    expect(true).toBe(true);
  });

  // Make sure things are sourced properly, and that we can instantiate Viewr.
  it("should let me instantiate Viewr", function() {
    var viewr = new Viewr("key");
    expect(viewr).not.toBe(null);
  });

  // Make sure it throws an exception when there's no key provided.
  it("should throw an exception if no API key is provided", function() {
    var test = function() {
      var viewr = new Viewr();
    };

    expect(test).toThrow(new Error("You must provide a Flickr API key for Viewr to work."));
  });

  // Make sure default options are stored if none are provided.
  it("should set default options if no options are given", function() {
    var viewr = new Viewr("key");
    expect(viewr.opts.filter).toBe(null);
    expect(viewr.opts.increment).toBe(true);
    expect(viewr.opts.incRatio).toBe(2);
    expect(viewr.opts.square).toBe(false);
  });

  // Make sure changed options are stored if provided
  it("should persist provided options", function() {
    var opts = {
      filter: ".someClass",
      increment: false,
      incRatio: 3,
      square: true
    };

    var viewr = new Viewr("key", opts);
    expect(viewr.opts.filter).toBe(".someClass");
    expect(viewr.opts.increment).toBe(false);
    expect(viewr.opts.incRatio).toBe(3);
    expect(viewr.opts.square).toBe(true);
  });


  // Make sure the key is stored with the instance.
  it("should keep track of the key it's given", function() {
    var key = "key";
    var viewr = new Viewr("key");
    expect(viewr.key).toBe("key");
  });

});
