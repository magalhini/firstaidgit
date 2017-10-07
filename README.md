<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [First Aid git](#first-aid-git)
  - [How to run](#how-to-run)
  - [Make a build](#make-a-build)
  - [Using the CLI](#using-the-cli)
  - [Notes](#notes)
  - [Contributing with git answers](#contributing-with-git-answers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#First Aid git

## How to run

1. `npm install`
2. `npm run start` to start the Webpack development mode
3. `npm build` to start the Webpack build

## Make a build

Gulp.js is used to generate the Webpack build and take care of copying the assets to a build
folder.

Make sure to have gulp installed and run:

`gulp build`

To generate a deployable version.

## Using the CLI

There's an experimental CLI for First Aid Git!

You can install it via npm by doing:

`npm install -g firstaidgit`

And use by running `firstaidgit your search` from your terminal.

![example](http://g.recordit.co/UTxbJhNv5s.gif)

## Notes

Please note that this project needs a lot of fixes as far as best practices go.
It began its lifecycle as an experiment and there's plenty of improvements that can be done,
so feel free to contribute if you'd like to make any changes to it.

## Contributing with git answers

All answers live in `assets/posts.json`.
