Fittr
=====

Easily add Flickr images to your webpages. 
Simply annotate your images with the id's of flickr images.

 * Looks great on retina devices!
 * Doesn't load unnecessarily large images! 
 * Entirely client-side!
 * No dependencies!
 * Recommended by 9/10 dentists!


Background
----------

Loading responsive images is a bit difficult, considering you need to have access to multiple
sizes of the same image. If you load a retina-quality image for every user, the ones without 
retina screens suffer from awful load times. 

Usage
-----

To use this in your site, first include the script file at the bottom of your page:

    <script src="fittr.js"></script>

Starting up Fittr is easy. Grab a Flickr API key from [here][4], up inside ```<script>``` tags right after that, as follows: 
    
    <script>
    
      Fittr("yourFittrApiKey", {
        /* Options */  
      });
    
    </script>


Loading an image from flickr is easy. In your image tag, don't add a ```src``` attribute. 
Instead, add a  ```data-flickr-id``` attribute, and set it equal to the id of an image on Flickr. 
Be sure to set a width, either with CSS or inline:

    <img data-flickr-id="9467631964" width="500" alt="Flickr photo"></img>

And that's it! Fittr takes care of loading the optimal image size from Flickr, whether on a retina display or not.


Options
-------

You can pass a number of options to Fittr:

#### filter ####
Only runs on img tags with a given id or class. This lets you use different
options on different groups of images by creating different copies of Fittr.

    default: null
    options: any selector (string)

#### increment ####
Determines whether to load a half resolution image first, and load a full resolution one later.
Good if you're loading large images and want to display content as soon as possible.
    
    default: true
    options: boolean (true / false)

#### incRatio ####
The ratio between the size of the final image loaded the incremental image load. 
Defaults to three, which means that the first image to load is 1/3 the resolution of the final image. 

    default: 3
    options: any number

#### square ####
Look only for square images (note that flickr only offers square images of size 75x75 and 150x150).

    default: false
    options: boolean (true / false)


FAQ
-----

#### What is a Flickr ID? ####

A flickr ID is the number in the URL of the image on Flickr. For example, if you want to use the the following image:

    http://www.flickr.com/photos/s_chen/8179836659/

you would use the id ```8179836659```.


#### How do I hide images before they're loaded? ####

Fittr makes sure the visability of every image is set to ```visable``` as soon as it has a valid ```src```
attribute. If you want to prevent users from seeing unstyled images, set them to be hidden before they're 
properly loaded by adding the following CSS:

    img[data-flickr-id] {
        visibility: hidden;
    }

#### Does this mean I can just use any image from Flickr? ####

While this script will work with any image accessible to your API key, you need to respect the licensing of
the photo. Make sure you have permission to share an image that you use. 


#### This is the coolest thing I've ever seen. Can I hire you? ####

I'm still a student, but I'm [looking for an internship][2]! 


Notes & Thanks
--------------

I drew a lot of inspiration from [responsive.io/][1] and have had nothing but good experiences from 
their service. 

If you notice any bugs, or if you have any feedback or feature requests, please feel free to [contact me][2]!

Thanks a ton to [Sandra Chen][3] for letting me use her awesome photos to make Fittr look good. 



[1]: https://responsive.io/
[2]: http://technoheads.org/about/
[3]: http://www.sandra-chen.com/
[4]: http://www.flickr.com/services/api/misc.api_keys.html