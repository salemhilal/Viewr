describe('Viewr images', function() {

  // Dummy elements for creating ViewrImage instances.
  var elem = document.createElement('img'); // Dummy image elem
  var data = {sizes:{size:[]}}; // FLickr data


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

    expect(test1).toThrow("Invalid ViewrImage: ensure elem and data are supplied");
    expect(test2).toThrow("Invalid ViewrImage: ensure elem and data are supplied");
    expect(test3).toThrow("Invalid ViewrImage: ensure elem and data are supplied");

  });

  // 
});
