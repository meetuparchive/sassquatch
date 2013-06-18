# SassQuatch
SassQuatch is a CSS foundation and framework for [Meetup](http://www.meetup.com), built with [Sass](http://sass-lang.com/).


- - -

## Installation

SassQuatch can be installed or updated via the [bower](https://github.com/twitter/bower) package manager, which requires Node 0.8.0 or higher:

	$ bower install sassquatch

SassQuatch will be installed in `./components/sassquatch` unless you've customized your bower install directory.

- - -

## Usage

### Using SassQuatch with CSS 

This package contains a minified compiled CSS file for both mobile and desktop SassQuatch.

#### Desktop CSS

    <link rel="stylesheet" href="components/sassquatch/desktop/sassquatch.css" />

#### Mobile CSS

    <link rel="stylesheet" href="components/sassquatch/mobile/sassquatch_m.css" />

- - -

### Using SassQuatch with Sass

You can import `_sassquatch.scss` or `_sassquatch_m.scss` into your base Sass file:
	
#### Desktop Sass include

	@import "compontents/sassquatch/desktop/sassquatch.scss";	
	
#### Mobile Sass include

	@import "components/sassquatch/mobile/sassquatch_m.scss";

- - -

## Documentation

http://meetup.github.io/sassquatch/

- - -

## How to contribute

SassQuatch development currently requires ruby gems Rake, Sass, and Jekyll.

To modify sassquatch, edit scss source files and/or liquid templates in jekyll docs. 

After editing, run `rake` in the root directory of the repo and point your browser at `localhost:4000`.

<!--
   -If you have push access, there's a separate task for updating the live github pages documentation:
   -
	-   $ rake ghpages
   -
   -_NOTE_: the `ghpages` task is intended to help update the live documentation after new changes have been merged into master. This won't launch new changes from other branches.
	-->
- - -


## License

Copyright 2013 Meetup

Licensed under the MIT License
