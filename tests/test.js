describe("Sanity Checking", function() {

  // Sanity check
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  // Make sure things are sourced properly, and that we can instantiate Viewr.
  it("should let me instantiate Viewr", function() {
    var viewr = new Viewr("key");
    expect(viewr).not.toBe(null);
  });

  // Make sure default options are stored if none are provided.
  it("should set default options if no options are given", function() {
    var viewr = new Viewr("key");
    expect(viewr.opts.filter).toBe(null);
    expect(viewr.opts.increment).toBe(true);
    expect(viewr.opts.incRatio).toBe(2);
    expect(viewr.opts.square).toBe(false);
  });

  // Make sure the key is stored with the instance.
  it("should keep track of the key it's given", function() {
    var key = "key";
    var viewr = new Viewr("key");
    expect(viewr.key).toBe("key");
  });

});
