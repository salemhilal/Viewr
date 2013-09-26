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

To use this in your site, first include the script file just before the closing ```<body>``` tag:

    <script srce="fittr.js"></script>

Start Fittr up inside ```<script>``` tags right after that, as follows: 
    
    <script>
    
      Fittr("77c12091df8cc54a5e0fb3ffc9e2c913", {
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
Only runs on img tags with a given selector (id or class). This is good if you want to use different
options on different groups of images.

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


Notes
-----

Fittr makes sure the visability of every image is set to ```visable``` as soon as it has a valid ```src```
attribute. If you want to prevent users from seeing unstyled images, set them to be hidden before they're 
properly loaded by adding the following CSS:

    img[data-flickr-id] {
        visibility: hidden;
    }

I drew a lot of inspiration from [responsive.io/][1] and have had nothing but good experiences from 
their service. 

If you notice any bugs, or if you have any feedback or feature requests, please feel free to [contact me][2]!

Thanks a ton to [Sandra Chen][3] for letting me use her awesome photos to showcase Fittr. 

Finally, note that while this script will load any publically available image from flickr, this does not 
mean that you sould use other people's photos without permission (or unless they say it's ok).




[1]: https://responsive.io/
[2]: http://technoheads.org/about/
[3]: http://www.sandra-chen.com/