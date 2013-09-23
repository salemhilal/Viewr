

var t = document.getElementsByTagName("img");
var imgs = [];
var apiKey = "";

for(var i = 0; i < t.length; i++) {
  var url = t[i].getAttribute("data-flickr-id");
  if(src) {
    imgs.push(new Image(url, t[i]));
  }
}

  getJSON(flickrRoot + src, function(data){
    _.sizes = data.sizes.size;
  });
  // Append a flickr id to this to get different sizes, plus url's.
  var flickrRoot = 

var Fittr = function(key) {

  var _ = this;
  var flickrRoot = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + key + "&format=json&nojsoncallback=1&photo_id=";
  
  // Don't need no stinkin' jQuery here.
  _.getJson = function getJSON(url, fn) {
    
    var r = new XMLHttpRequest();
    r.open("GET", url, true);

    r.onreadystatechange = function() {
      // readyState === 4 => ruest finished, response is ready
      if(r.readyState === 4 && r.status === 200) {
        fn(JSON.parse(r.responseText));
      }
    }
    r.send();
  };

  _.getJsonById = function(id, fn) {
    _.getJson(flickrRoot + id, fn);
  }

}

var Image = function(src, elem, apiKey){
  var _ = this;



  _.elem = elem; // Dom element of image.
  _.flickrId = src;   // url of image.
  
  // Get hardcoded styles
  _.cssWidth = _.elem.style.width;
  _.cssHeight = _.elem.style.height;
  _.width = _.elem.width;

  _.sizes; //Payload data
  _.ratio; // width / height




}


9467631964
