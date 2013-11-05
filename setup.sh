#!/bin/bash

#echo "~~~~~~~~ getting gem system latest..."
#gem update --system

#echo "~~~~~~~~ getting latest for bundler gem..."
#gem install bundler

echo "~~~~~~~~ installing required gems..."
bundle install

echo "~~~~~~~~ installing python requirements..."
pip install -r requirements.txt

echo "~~~~~~~~ installing bower components..."
bower install

echo "~~~~~~~~ recompile sassquatch..."
rake compile

exit 0
