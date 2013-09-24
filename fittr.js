var Fittr = function(key) {

  var _ = this;
  var flickrRoot = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + key + "&format=json&nojsoncallback=1&photo_id=";

  var t = document.getElementsByTagName("img");
  var imgs = [];
  var apiKey = "";

  for(var i = 0; i < t.length; i++) {
    var id = t[i].getAttribute("data-flickr-id");
    if(id) {
      _.getJsonById(id, function(data, err) {
        if(err) {
          console.error("Failed to retrieve image: " + id, err);
        }
        // Create a new image, initialize it, add it to the list of images.
        var currImg = new Image(id, t[i], apiKey, data);
        currImg.init;
        imgs.push(currImg);
      });
      
    }
  }

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

}

var Image = function(id, elem, apiKey, data){
  var _ = this;



  _.elem = elem; // Dom element of image.
  _.flickrId = id;   // url of image.
  _.sizes = data.sizes.size;
  
  // Get hardcoded styles
  _.cssWidth = _.elem.style.width;
  _.cssHeight = _.elem.style.height;
  _.width = _.elem.width;

  _.sizes; //Payload data
  _.ratio; // width / height
  _.init = function() {

  }
}


// 9467631964

