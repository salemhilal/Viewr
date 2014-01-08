var Viewr  = function(key, opts, fn) { //TODO: make opts optional.
  "use strict";

  if(!key) {
    throw "You must provide a Flickr API key for Viewr to work.";
  }

  var _ = this; // Makes things easier for me / I'm lazy and don't like typing.

  _.opts = opts || {};
  _.key = key;
  _.fn = fn || (function(){});

  // Get options ready
  _.opts.filter = _.opts.filter || null; // Will always return LHS
  _.opts.increment = ("increment" in _.opts) ? _.opts.increment : true;
  _.opts.incRatio = _.opts.incRatio || 2;
  _.opts.square = ("square" in _.opts) ? _.opts.square : false;

  // Where we make queries to.
  var flickrRoot = "http://api.flickr.com/services/rest/" +
    "?method=flickr.photos.getSizes&api_key=" +
    _.key + "&format=json&nojsoncallback=1&photo_id=";

  _.images = [];

  // Requests JSON data from @url, passes received data to callback @fn.
  // @fn accepts (err, obj), where err is any error and obj is received data.
  var getJson = function (url, fn) {

    var r = new XMLHttpRequest();
    r.open("GET", url, true);

    r.onreadystatechange = function() {
      // readyState === 4 => ruest finished, response is ready
      if (r.readyState === 4) {

        if (r.status === 200) { // Got a bite!
          fn(JSON.parse(r.responseText));
        }
        else { // Something went wrong
          console.error(r);
          fn(null, {
            status: r.status,
            statusText: r.statusText
          });
        }

      }
    };
    r.send();
  };

  // Given a Flickr ID, request a list of sizes.
  _.getImgsForID = function(id, fn) {
    getJson(flickrRoot + id, fn);
  };

  // Are we done with all our requests?
  _.done = false;

  _.reload = function() {
    _.done = false;
    var count = 1; 


    // Get the list of image tags, filtering if need be.
    var rawImgs;
    if (!_.opts.filter) {
      rawImgs = document.getElementsByTagName("img");
    }
    else {
      rawImgs = document.querySelectorAll(_.opts.filter);
    }

    // If there are no images, call the callback and return
    if(rawImgs.length === 0) {
      _.fn();
      return;
    }
    
    // NodeList to Array, so we can do foreach.
    var imgs = [];
    for (var i = rawImgs.length; i--; imgs.unshift(rawImgs[i]));

    imgs.forEach(function(elem) {
      var id = elem.getAttribute("data-flickr-id"); //TODO: Make this user defined.
      var tag = elem.tagName.toLowerCase();

      if(id && tag === "img") {
        _.getImgsForID(id, function(data, err) {
          if(err) {
            console.error("Failed to retrieve image: " + id, err);
          }

          // Create a new image, initialize it, add it to the list of images.
          var currImg = new ViewrImage(elem, data, opts);
          currImg.init();
          _.images.push(currImg);
        });
      }
    });
  };

  _.reload();

};

var ViewrImage = function(elem, data, opts){

  var _ = this;
  _.opts = opts || {};

  // Verify inputs
  if ( !(elem instanceof Element) ||
       !(data) ||
       !(data.sizes) ||
       !(data.sizes.size instanceof Array)) {
    throw 'Invalid ViewrImage: ensure elem and data are supplied';   
  }

  //TODO: Make these attributes of this. Don't forget @elem.
  var sizes = data.sizes.size;                 // Data from Flickr
  var square = _.opts.square || false;           // Do we want a square image?
  var density = window.devicePixelRatio || 1;  // Pixel density. Default to 1.
  var pick;                                    // Holds the image we picked.
  var increment = _.opts.increment || true;      // Whether or not to load progressively larger images.
  var pickIncrement;                           // If increment is on, the image to increment from.
  var incRatio = _.opts.incRatio || 2;

  // Calculate necessary width. We don't use height, as we don't do any
  // pre-processing on the image and so wouldn't need it.
  // Thus, we need (element's defined width) * (pixel density)
  _.width = (elem.width || elem.style.width) * density;

  // Work your magic, Viewr.
  _.init = function() {
    console.log("Initializing image with width of", _.width);

    // Find the biggest image that will fit correctly.
    for (var i = 0; i < sizes.length; i++) {

      // If we're not looking for square images, skip over them.
      if (sizes[i].label.toLowerCase().indexOf("square") !== -1 && !square) {
        continue;
      }
      // Likewise, if we are, looking for square images, skip over everything else.
      if (sizes[i].label.toLowerCase().indexOf("square") === -1 && square) {
        continue;
      }

      // Update the one we pick
      pick = sizes[i];
      if (pick.width >= _.width) {
        break;
      }

      if ( increment &&                           // We want to increment
           !pickIncrement &&                      // We haven't found an inc image yet
           pick.width >= _.width / incRatio) {  // This one will do.
        pickIncrement = pick;
        elem.setAttribute("src", pick.source);
      }

    }

    if (increment && pickIncrement) {
      elem.onload = function(){
        elem.setAttribute("src", pick.source);
      };
      elem.setAttribute("src", pickIncrement.source);

    }
    else {
      elem.setAttribute("src", pick.source);
    }

    elem.style.visibility = "visible";

  };
};
