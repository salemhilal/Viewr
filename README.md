Fittr
=====

Smartly add Flickr images to your webpages. 
Simply annotate your images with the id's of flickr images.


Usage
-----

To use this in your site, first include the script file just before the closing ```<body>``` tag:

    <script srce="fittr.js"></script>

Start Fittr up inside ```<script>``` tags right after that, as follows: 
    
    <script>
    
      Fittr("77c12091df8cc54a5e0fb3ffc9e2c913", {
        /* Options */  
      });
    
    </script>


Loading an image from flickr is easy. In your image tag, don't add a ```src``` attribute. 
Instead, add a  ```data-flickr-id``` attribute, and set it equal to the id of an image on Flickr:

    <img data-flickr-id="9467631964" width="500" alt="Flickr photo"></img>

And that's it! Fittr takes care of loading the optimal image size from Flickr, whether on a retina display or not.


Options
-------

You can pass a number of options to Fittr:

#### increment ####
Determines whether to load a half resolution image first, and load a full resolution one later.
Good if you're loading large images and want to display content as soon as possible.
    
    default: false
    options: boolean (true / false)

#### square ####
Look only for square images (note that flickr only offers square images of size 75x75 and 150x150).

    default: false
    options: boolean (true / false)


Extras
------

I drew a lot of inspiration from [https://responsive.io/][1] and have had nothing but good experiences with 
their service. 

If you notice any bugs, or if you have any feedback or feature requests, please feel free to [contact me]!



[1]: https://responsive.io/
[2]: http://technoheads.org/about/