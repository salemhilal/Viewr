var Fittr = function(key, opts) {
  var _ = this;
  var opts = opts || {};
  var flickrRoot = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + key + "&format=json&nojsoncallback=1&photo_id=";

  var images = [];
  var apiKey = "";
  var filter = opts.filter || null;

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

  _.reload = function(){
    // Get the list of image tags, filtering if need be.
    var rawImgs;
    if (!filter) {
      rawImgs = document.getElementsByTagName("img");
    }
    else {
      rawImgs = document.querySelectorAll(filter);
    }

    for(var i = 0; i < rawImgs.length; i++) {
      var id = rawImgs[i].getAttribute("data-flickr-id");
      var tag = rawImgs[i].tagName.toLowerCase();
      if(id &&  tag == "img") {
        var elem = rawImgs[i];
        getJsonById(id, function(data, err) {
          if(err) {
            console.error("Failed to retrieve image: " + id, err);
          }
          // Create a new image, initialize it, add it to the list of images.
          var currImg = new FittrImage(elem, data, opts);
          currImg.init();
          images.push(currImg);
        });
        
      }
    }
  }

  _.reload();

}

var FittrImage = function(elem, data, opts){
  var opts = opts || {};

  var _ = this;

  var elem = elem;                             // Dom element of image.
  var sizes = data.sizes.size;                 // Data from Flickr
  var square = opts.square || false;           // Do we want a square image?
  var density = window.devicePixelRatio || 1;  // Pixel density. Default to 1.
  var pick;                                    // Holds the image we picked. 
  var increment = opts.increment || true;      // Whether or not to load progressively larger images.
  var pickIncrement;                           // If increment is on, the image to increment from.
  var incRatio = opts.incRatio || 2;

  // Calculate necessary width. We don't use height, as we don't do any
  // pre-processing on the image and so wouldn't need it.
  // Thus, we need (element's defined width) * (pixel density) 
  _.width = (elem.width || elem.style.width) * density;

  // Work your magic, Fittr.
  _.init = function() {

    // Find the biggest image that will fit correctly.
    for(var i = 0; i < sizes.length; i++) {
      
      // If we're not looking for square images, skip over them.
      if(sizes[i].label.toLowerCase().indexOf("square") !== -1 && !square)
        continue;
      // Likewise, if we are, looking for square images, skip over everything else.
      if(sizes[i].label.toLowerCase().indexOf("square") == -1 && square)
        continue;

      // Update the one we pick
      pick = sizes[i];
      if(pick.width >= _.width)
        break;

      if(increment                              // We want to increment
        && !pickIncrement                       // We haven't found an inc image yet
        && pick.width >= _.width / incRatio) {  // This one will do.
        pickIncrement = pick;
        elem.setAttribute("src", pick.source);
      }

    }

    if(increment && pickIncrement) {
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