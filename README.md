# Sassquatch
Sassquatch is a CSS foundation and framework for [Meetup](http://www.meetup.com), built with [Sass](http://sass-lang.com/).


- - -

## Installation

Sassquatch can be installed or updated via the [bower](https://github.com/twitter/bower) package manager, which requires Node 0.8.0 or higher:

	$ bower install sassquatch

Sassquatch will be installed in `./components/sassquatch` unless you've customized your bower install directory.

- - -

## Usage

### Using Sassquatch with CSS

This package contains a minified compiled CSS file for both mobile and desktop Sassquatch.

#### Desktop CSS

    <link rel="stylesheet" href="components/sassquatch/desktop/sassquatch.css" />

#### Mobile CSS

    <link rel="stylesheet" href="components/sassquatch/mobile/sassquatch_m.css" />


### Using Sassquatch with Sass

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
SassQuatch development currently requires Python, Ruby and the ruby gems Rake, Sass, and Jekyll.

#### Easy setup (Mac OS X)

```
$ brew update
$ brew install rbenv ruby-build
$ git clone git@github.com:meetup/sassquatch.git; ./setup.sh
```

#### Editing sass source and documentation
To modify sassquatch, edit scss source files and/or liquid templates in jekyll docs.
After editing, run `rake` in the root directory of the repo and point your browser at `localhost:4000`.

There are also specific rake targets for recompiling docs, launching jekyll, and recompiling Sass individually:

	(compile sass and rebuild docs) $ rake compile

	(build jekyll docs only) $ rake docs

	(start jekyll) $ rake jekyll


#### Updating live docs
If you have push access, there's a separate task for sending new changes to the live github pages branch:

	$ rake push_docs

For the `master` branch docs, the style guide is here: http://meetup.github.io/sassquatch/

For all other branches, the style guide will be built to http://meetup.github.io/sassquatch/branches/::yourbranchname::/

_NOTE_: If you are not on the `master` or `dev` branch, you will be asked to confirm that you want to build docs for your branch.
- - -


## License

Copyright 2013 Meetup

Licensed under the MIT License
