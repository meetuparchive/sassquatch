# SassQuatch
SassQuatch is a CSS foundation and framework for [Meetup](http://www.meetup.com), built with [Sass](http://sass-lang.com/).

## Installation

SassQuatch can be installed or updated via the [bower](https://github.com/twitter/bower) package manager, which requires Node 8.0 or higher:

	$ bower install sassquatch

SassQuatch will be installed in `./components/sassquatch` unless you've customized your bower install directory.


## Usage

### Using SassQuatch with Sass

You can import `sassquatch.scss` into your base Sass file:
	
	@import "compontents/sassquatch/scss/sassquatch.scss";



### Building a standalone CSS file

You don't need to use Sass in order to use SassQuatch; We've included a [rake](https://github.com/jimweirich/rake) task to build a standalone CSS file from Sass source:

	$ cd components/sassquatch
	$ rake

The CSS file will be built to `./components/css/sassquatch.css`.


## Documentation

Docs are on the way!

## License

Copyright 2013 Meetup

Licensed under the MIT License
