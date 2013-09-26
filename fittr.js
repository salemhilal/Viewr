var Fittr = function(key) {

  var _ = this;
  var flickrRoot = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + key + "&format=json&nojsoncallback=1&photo_id=";

  _.images = [];
  var apiKey = "";

  // Don't need no stinkin' jQuery here.
  _.getJson = function (url, fn) {
    
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

  _.getJsonById = function(id, fn) {
    _.getJson(flickrRoot + id, fn);
  }

  var rawImgs = document.getElementsByTagName("img");
  for(var i = 0; i < rawImgs.length; i++) {
    var id = rawImgs[i].getAttribute("data-flickr-id");
    if(id) {
      var elem = rawImgs[i];
      _.getJsonById(id, function(data, err) {
        if(err) {
          console.error("Failed to retrieve image: " + id, err);
        }
        // Create a new image, initialize it, add it to the list of images.
        var currImg = new Image(id, elem, data);
        currImg.init();
        _.images.push(currImg);
      });
      
    }
  }
}

var Image = function(id, elem, data, opts){
  var opts = opts || {};

  var _ = this;

  _.elem = elem;                            // Dom element of image.
  _.flickrId = id;                          // url of image.
  _.sizes = data.sizes.size;                // Data from Flickr
  _.square = opts.square || false;          // Do we want a square image?
  _.density = window.devicePixelRatio || 1; // Pixel density. Default to 1.
  _.pick;                                   // Holds the image we picked. 

  // Calculate necessary width. We don't use height, as we don't do any
  // pre-processing on the image and so wouldn't need it.
  // Thus, we need (element's defined width) * (pixel density) 
  _.width = (_.elem.width || _.elem.style.width) * window.devicePixelRatio;
  console.log(_.width);

  // Work your magic, Fittr.
  _.init = function() {

    // Find the biggest image that will fit correctly.
    var pick = null;
    for(var i = 0; i < _.sizes.length; i++) {
      
      // If we're not looking for square images, skip over them.
      if(_.sizes[i].label.toLowerCase().indexOf("square") !== -1 && !_.square)
        continue;

      // Update the one we pick
      pick = _.sizes[i];
      if(pick.width >= _.width)
        break;
    }

    console.log("IMAGES!", pick.source);
    _.elem.height = pick.height;
    _.elem.setAttribute("src", pick.source);

  }
}

