#!/bin/bash

echo "~~~~~~~~ using correct ruby..."
rbenv install

echo "~~~~~~~~ getting gem system latest..."
gem update --system

echo "~~~~~~~~ getting latest for bundler gem..."
gem install bundler

echo "~~~~~~~~ installing required gems..."
bundle install

echo "~~~~~~~~ installing required node modules..."
npm install

echo "~~~~~~~~ installing bower components..."
bower install

echo "~~~~~~~~ recompile sassquatch..."
rake compile

exit 0
