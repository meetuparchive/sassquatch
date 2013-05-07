# SassQuatch
SassQuatch is a CSS foundation and framework for [Meetup](http://www.meetup.com), built with [Sass](http://sass-lang.com/).

## Installation

SassQuatch can be installed or updated via the [bower](https://github.com/twitter/bower) package manager, which requires Node 8.0 or higher:

	$ bower install sassquatch

SassQuatch will be installed in `./components/sassquatch` unless you've customized your bower install directory.


## Usage

### Using SassQuatch with plain CSS 

This package contains a minified compiled CSS file for both mobile and desktop SassQuatch.

    <!-- desktop -->
    <link rel="stylesheet" href="components/sassquatch/desktop/sassquatch.css" />

    ------------------------------------

    <!-- mobile -->
    <link rel="stylesheet" href="components/sassquatch/mobile/sassquatch_m.css" />


### Using SassQuatch with Sass

You can import `sassquatch.scss` into your base Sass file:
	
	@import "compontents/sassquatch/scss/sassquatch.scss";


## Documentation

Docs are on the way!

## License

Copyright 2013 Meetup

Licensed under the MIT License
