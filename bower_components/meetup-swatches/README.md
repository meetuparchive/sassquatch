# Swatches for Meetup

Hues at my Meetup?

Here they are - standardized and design-approved Meetup colors. For web, mobile web, iOS, and Android.

----

### Development setup

1. make sure you have ruby 2.0.0 installed (if you use rbenv this will be easy, .ruby-version sets the correct version for the project)
2. make sure you have the `bundler` gem installed
3. use bundler to install dependencies
4. After editing `colors.yaml` use this command to rebuild the consumable files

```
	$ bundle install
	$ cd src
	$ edit colors.yaml
	...
	$ ruby build.rb
```
