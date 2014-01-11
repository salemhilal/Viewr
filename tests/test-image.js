describe('Viewr images', function() {

  // Dummy elements for creating ViewrImage instances.
  var elem = document.createElement('img'); // Dummy image elem
  elem.width = 950;
  elem.style.width = 950;
  var data = { sizes: { size: [
      { label: "", width: 100, source: "100.jpg" },
      { label: "", width: 200, source: "200.jpg" },
      { label: "", width: 300, source: "300.jpg" },
      { label: "", width: 400, source: "400.jpg" },
      { label: "", width: 500, source: "500.jpg" },
      { label: "", width: 600, source: "600.jpg" },
      { label: "", width: 700, source: "700.jpg" },
      { label: "", width: 800, source: "800.jpg" },
      { label: "", width: 1000, source: "1000.jpg" },
      { label: "", width: 1200, source: "1200.jpg" },
      { label: "", width: 1400, source: "1400.jpg" },
      { label: "", width: 1600, source: "1600.jpg" },
      { label: "", width: 1800, source: "1800.jpg" },
      { label: "", width: 2000, source: "2000.jpg" },
      { label: "", width: 2400, source: "2400.jpg" }

    ]}}; // FLickr data


  // Can you instantiate them?
  it('should be able to be instantiated', function() {
    var viewrImage = new ViewrImage(elem, data);
    expect(viewrImage).not.toBe(null);
  });

  // Our test args are proper.
  it('should not throw an error if we give it test args.', function() {
    var test1 = function() {
      var viewrImage = new ViewrImage(elem, data);
    };

    expect(test1).not.toThrow();
  });

  // Will it yell when it's not given proper args?
  it('should throw an error if not given proper inputs', function() {
    var test1 = function() {
      var viewrImage = new ViewrImage(null, data);
    };

    var test2 = function() {
      var viewrImage = new ViewrImage(elem);
    };

    var test3 = function() {
      var viewrImage = new ViewrImage();
    };

    var err = "Invalid ViewrImage: ensure elem and data are supplied";

    expect(test1).toThrow(err);
    expect(test2).toThrow(err);
    expect(test3).toThrow(err);

  });

  // Make sure we're picking the right sized image. That'd be awkward.
  it('should pick the image that fits best', function() {
    var tmp = window.devicePixelRatio;
    window.devicePixelRatio = 1;
    var flag = false;
    var vImg;

    runs(function() {
      vImg = new ViewrImage(elem, data, null, function(){
        flag = true;
      });
      vImg.init();
    });

    waitsFor(function() {
      return flag;
    });

    runs(function() {
      expect(vImg.elem.getAttribute("src")).toBe("1000.jpg");
    });

  });

  // Retina test!
  it('should pick the image that fits best, even on retina devices', function() {
    var tmp = window.devicePixelRatio;
    window.devicePixelRatio = 2;
    var flag = false;
    var vImg;

    runs(function() {
      vImg = new ViewrImage(elem, data, null, function(){
        flag = true;
      });
      vImg.init();
    });

    waitsFor(function() {
      return flag;
    });

    runs(function() {
      expect(vImg.elem.getAttribute("src")).toBe("2000.jpg");
    });

  });
});
