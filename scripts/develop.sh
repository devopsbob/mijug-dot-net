#!/bin/bash
# This script is used to develop the Jekyll site with live reload and incremental builds.
cd "$(dirname "$0")/.."
echo "Starting Jekyll development server with live reload and incremental builds."
if [ ! -d .git ]; then
  echo "This directory is not a Git repository. Exiting."
  exit 1
fi
if [ ! -f Gemfile ]; then
  echo "Gemfile not found. Please ensure you are in the correct directory."
  exit 1
fi
echo "Installing dependencies from Gemfile."
bundle install --path vendor/bundle
if [ $? -ne 0 ]; then
  echo "Bundle install failed. Exiting."
  exit 1
fi
echo "Dependencies installed successfully. Starting Jekyll development server."
if [ ! -f _config.yml ]; then
  echo "_config.yml not found. Please ensure you are in the correct directory."
  exit 1
fi
if [ ! -d _site ]; then
  echo "Creating _site directory."
  mkdir _site
fi
echo "Starting Jekyll development server with live reload and incremental builds."
JEKYLL_ENV=development bundle exec jekyll serve --livereload --incremental --host ""
if [ $? -ne 0 ]; then
  echo "Jekyll server failed to start. Exiting."
  exit 1
fi
echo "Jekyll development server is running. You can view the site at http://localhost:4000."
echo "Press Ctrl+C to stop the server."
# Note: This script assumes that you have Jekyll and its dependencies installed.
