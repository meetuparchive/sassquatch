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

You'll need to compile Sass in order to link to a CSS file:

```
 (desktop)
 $ sass -q sass/sassquatch.scss [TARGET_DIR]
 
  (mobile)
 $ sass -q sass/sassquatch_mobile.scss [TARGET_DIR]
```

#### Desktop CSS

    <link rel="stylesheet" href="components/sassquatch/desktop/sassquatch.css" />

#### Mobile CSS

    <link rel="stylesheet" href="components/sassquatch/mobile/sassquatch_m.css" />


### Using Sassquatch with Sass

You can import `_sassquatch.scss` or `_sassquatch_mobile.scss` into your base Sass file:
	
#### Desktop Sass include

	@import "compontents/sassquatch/desktop/sassquatch.scss";	
	
#### Mobile Sass include

	@import "components/sassquatch/mobile/sassquatch_mobile.scss";

- - -

## Documentation (style guide)

http://meetup.github.io/sassquatch/

- - -

## Development
SassQuatch development currently requires Ruby 2.0.0 and the [bundler](http://bundler.io/) gem.

#### (Recommended) Installing rbenv
```
$ brew update
$ brew install rbenv ruby-build
```

#### Easy setup
```
$ git clone git@github.com:meetup/sassquatch.git; ./setup.sh
```

#### Editing sass source and documentation
To modify sassquatch, edit scss source files in `sass/`. We document our Sass components using [hologram](http://trulia.github.io/hologram/).

```
	(compile sass and rebuild docs) $ rake
```

Hologram builds static documentation to `doc_mobile/` and `doc_desktop/`; open these in your favorite browser locally to test during development.


#### Submitting changes

We will keep `master` in sync with the code that is deployed to Meetup.com. The 'active' branch that will collect pull requests is `dev`. When a release is ready to be pulled into an in-development feature, `dev` will be tagged. There will be no short-lived `release_x` branches.

This will approximate the [git-flow](http://nvie.com/posts/a-successful-git-branching-model/) development pattern (although tags will be on `dev` instead of `master`).

If you use [hub](https://github.com/github/hub), you can target your pull requests to the `dev` branch. Otherwise, the repo maintainer will merge into `dev` when the pull request is ready.

```sh
$ hub pull-request -b Meetup:dev -h {sourceGitHubAccount}:{sourceGitHubBranch}
```

If you have push access, `{sourceGitHubAccount}` is usually `Meetup`.

#### Updating live docs
If you have push access, there's a separate task for sending new changes to the live github pages branch:

	$ rake push_docs

_NOTE_: Currently, you must be in `master` to push updates to live documentation.
- - -


## License

Copyright 2014 Meetup

Licensed under the MIT License
