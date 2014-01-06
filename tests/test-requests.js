describe("The requests that Viewr makes", function() {
  
  // Is there a key? If not, this suite of tests will more or less all fail.
  it("should have a valid key. (Look at keys.example.js if you have issues here)", function() {
    expect(flickr_key).not.toBe(null);
    expect(flickr_key).not.toBe("YOUR_KEY_HERE");
  });

  // Can we request image URL's? That'd sure be awful nice.
  it("should successfully grab a list of images from Flickr, given an image id", function() {
    var viewr = new Viewr(flickr_key);
    var flag = false; // Start the request
    var data = null, err = null;

    runs(function() {
      viewr.getImgsForID('9074324292', function(d, e) { // HELLO SMALL CHILDREN.
        flag = true; // End request
        data = d ? d : null;
        err  = e ? e : null;
      });  
    });
   
    waitsFor(function() {
      return flag;
    }, "We should have gotten something from Flickr", 1000);

    runs(function() {
      expect(data).not.toBe(null);
      expect(data.sizes).not.toBe(null);
      expect(data.sizes.size).not.toBe(null);
      expect(data.sizes.size instanceof Array).toBe(true);
      expect(err).toBe(null);
    });

  });
});
