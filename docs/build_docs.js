#!/usr/bin/env node

var hogan = require('hogan.js'),
    fs    = require('fs');

var layout, pages;

// compile layout template
layout = fs.readFileSync(__dirname + '/../templates/layout.mustache', 'utf-8');
layout = hogan.compile(layout, { sectionTags: [{o:'_i', c:'i'}] });

// retrieve pages
pages = fs.readdirSync(__dirname + '/../templates/pages');

// iterate over pages
pages.forEach(function (name) {

  page = hogan.compile(page)
  page = layout.render(context, {
    body: page
  })

  fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8')
})
