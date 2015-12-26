Moments
=============
####A UNSW SENG2021 Project by dafny4lyfe (15S2)
(no longer being developed or maintained)

Moments lets you search for and navigate through images via date, time and location more easily. It utilises the flickr API to search for and display images from the flickr repository. You can limit the search radius as well as the data range via the elements that overlay the map. AJAX is used to dynamically add images to the gallery as you scroll to the oldest end. Images are sorted newest first (on the right). Best for viewing location changes over time, events during a particular time (conventions, disasters) and images of something in particular from a specific area.

The original requirement for the project was to make use of an existing data source to create a website/webapp that enhances the user experience. Our team had started with virtually no experience with web APIs, Django and little experience in web development. The time allocated for this project was about 10 weeks, but the actual implementation period when you take away documentation/planning stages (and procrastination...) was closer to 1 month.

####Instructions
The webapp should be mostly intuitive as long as you explore the UI.  
Tip: A smaller location radius tends to generate better results than a large one.

Search
* Tags: top search bar (must press enter after each tag)
* Location and search radius: interact with the map or manually type location/radius in the map textbox
* Date range: move the slider to change year, or click on the bubble for a calendar

Display
* Gallery: Scroll with mousewheel or arrow keys. Scrolling to leftmost end adds more images if they are available.
* Image lightbox: Click on an image in the gallery for a larger version with higher clarity. Able to scroll with arrow keys. Image source available at bottom of image.
* Slideshow controls
  * Play: Auto-scroll through gallery (right)
  * >>: Faster
  * <<: Slower

Example: Sydney Harbour Bridge (construction)
* Tags: "Sydney Harbour Bridge" (all one tag)
* Location: 1000m of Sydney Harbour Bridge, Sydney NSW, Australia
* Date range: Earliest -> 2001

Here, you can see images of Sydney Harbour Bridge both as it is today and as it were whilst it was under construction.

####Known bugs
* Gallery mouse drag results in erratic behaviour
* The first few images of each set of images (each AJAX load) will sometimes not appear in the gallery. Workaround: press enter on the URL again (rather than refresh)

####APIs/Libraries used
* [Flickr API](https://www.flickr.com/services/api/)
* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/)
* [ContentFlow](http://www.jacksasylum.eu/ContentFlow/docu.php) - _originally broken, edited to become less broken_
* [fancyBox](http://fancybox.net/)
* [jQuery 1.11.3](https://jquery.com/)
* [Bootstrap 3.3.6](http://getbootstrap.com/)
* [tokenfield](http://sliptree.github.io/bootstrap-tokenfield/)
