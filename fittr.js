var Fittr = function(key, opts) {
  var opts = opts || {};
  var flickrRoot = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + key + "&format=json&nojsoncallback=1&photo_id=";

  var images = [];
  var apiKey = "";

  // Requests JSON data from given url.
  var getJson = function (url, fn) {
    
    var r = new XMLHttpRequest();
    r.open("GET", url, true);

    r.onreadystatechange = function() {
      // readyState === 4 => ruest finished, response is ready
      if (r.readyState === 4) {
        if (r.status === 200){
          fn(JSON.parse(r.responseText));
        }
        else{
          console.error(r);
          fn(null, {
            status: r.status,
            statusText: r.statusText
          }); 
        }
      }
    }
    r.send();
  };

  // Given a Flickr ID, request a list of sizes.
  var getJsonById = function(id, fn) {
    getJson(flickrRoot + id, fn);
  }

  var rawImgs = document.getElementsByTagName("img");
  for(var i = 0; i < rawImgs.length; i++) {
    var id = rawImgs[i].getAttribute("data-flickr-id");
    if(id) {
      var elem = rawImgs[i];
      getJsonById(id, function(data, err) {
        if(err) {
          console.error("Failed to retrieve image: " + id, err);
        }
        // Create a new image, initialize it, add it to the list of images.
        var currImg = new FittrImage(elem, data, {
          increment: opts.increment || false,
          square: opts.square || false
        });
        currImg.init();
        images.push(currImg);
      });
      
    }
  }
}

var FittrImage = function(elem, data, opts){
  var opts = opts || {};

  var _ = this;

  var elem = elem;                            // Dom element of image.
  _.sizes = data.sizes.size;                  // Data from Flickr
  var square = opts.square || false;          // Do we want a square image?
  var density = window.devicePixelRatio || 1; // Pixel density. Default to 1.
  var pick;                                   // Holds the image we picked. 
  var increment = opts.increment || false;    // Whether or not to load progressively larger images.
  var pickIncrement;                          // If increment is on, the image to increment from.

  // Calculate necessary width. We don't use height, as we don't do any
  // pre-processing on the image and so wouldn't need it.
  // Thus, we need (element's defined width) * (pixel density) 
  _.width = (elem.width || elem.style.width) * density;

  // Work your magic, Fittr.
  _.init = function() {

    // Find the biggest image that will fit correctly.
    for(var i = 0; i < _.sizes.length; i++) {
      
      // If we're not looking for square images, skip over them.
      if(_.sizes[i].label.toLowerCase().indexOf("square") !== -1 && !square)
        continue;
      // Likewise, if we are, looking for square images, skip over everything else.
      if(_.sizes[i].label.toLowerCase().indexOf("square") == -1 && square)
        continue;

      // Update the one we pick
      pick = _.sizes[i];
      if(pick.width >= _.width)
        break;

      if(increment                          // We want to increment
        && !pickIncrement                   // We haven't found an inc image yet
        && pick.width >= _.width / 2) {     // This one will do.
        console.log(pick.source);
        pickIncrement = pick;
        elem.setAttribute("src", pick.source);
      }

    }

    if(increment) {
      console.log(pickIncrement.width);
      console.log(pick.width);
      elem.onload = function(){
        elem.setAttribute("src", pick.source);
      }
      elem.setAttribute("src", pickIncrement.source);

    }
    else {
      elem.setAttribute("src", pick.source);
    }

    elem.style.visibility = "visible";

  }
}


// 9467631964