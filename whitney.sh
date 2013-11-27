#!/bin/bash

echo "~~~~~~~~ getting gem system latest..."
gem update --system

echo "~~~~~~~~ getting latest for bundler gem..."
gem install bundler

echo "~~~~~~~~ installing required gems..."
bundle install

echo "~~~~~~~~ installing python requirements..."
pip install -r requirements.txt

echo "~~~~~~~~ installing bower components..."
bower install

echo "~~~~~~~~ recompile sassquatch..."
rake compile

echo "-----------------------------------------"
echo "   Yeah! Wanna dance with somebody!"
echo "                                   "
echo "   run 'rake' then point your browser"
echo "   at localhost:4000/index.html"
echo "   at localhost:4000/sepcimen.html"
echo "   at localhost:4000/specimen-event.html"
echo "                                   "
echo "   With somebody who loves me"
echo "-----------------------------------------"

exit 0
