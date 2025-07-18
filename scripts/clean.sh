#!/bin/bash
# This script cleans up the Jekyll site by removing specific files and directories.
cd "$(dirname "$0")/.."
echo "Starting cleanup of Jekyll site."
if [ ! -d .git ]; then
  echo "This directory is not a Git repository. Exiting."
  exit 1
fi
echo "Cleaning up Jekyll site files."
# Remove the _site directory if it exists
if [ -d _site ]; then
  echo "Removing _site directory."
  rm -rf _site
else
  echo "_site directory does not exist, skipping removal."
fi
# Remove the .jekyll-cache directory if it exists
if [ -d .jekyll-cache ]; then
    echo "Removing .jekyll-cache directory."
    rm -rf .jekyll-cache
else
    echo ".jekyll-cache directory does not exist, skipping removal."
fi
# Remove the .sass-cache directory if it exists
if [ -d .sass-cache ]; then
    echo "Removing .sass-cache directory."
    rm -rf .sass-cache
else
    echo ".sass-cache directory does not exist, skipping removal."
fi
# Remove the .jekyll-metadata file if it exists
if [ -f .jekyll-metadata ]; then
    echo "Removing .jekyll-metadata file."
    rm -f .jekyll-metadata
else
    echo ".jekyll-metadata file does not exist, skipping removal."
fi
# Remove the .jekyll-tmp directory if it exists
if [ -d .jekyll-tmp ]; then 
    echo "Removing .jekyll-tmp directory."
    rm -rf .jekyll-tmp
else
    echo ".jekyll-tmp directory does not exist, skipping removal."
fi
# Remove vendor/bundle if it exists
if [ -d vendor/bundle ]; then
    echo "Removing vendor/bundle directory."
    rm -rf vendor/bundle
else
    echo "vendor/bundle directory does not exist, skipping removal."
fi
# Remove the Gemfile.lock file if it exists
if [ -f Gemfile.lock ]; then

    echo "Removing Gemfile.lock file."
    rm -f Gemfile.lock
else
    echo "Gemfile.lock file does not exist, skipping removal."
fi
# Remove the node_modules directory if it exists
if [ -d node_modules ]; then
    echo "Removing node_modules directory."
    rm -rf node_modules
else
    echo "node_modules directory does not exist, skipping removal."
fi
# Remove .bundler directory if it exists
if [ -d .bundle ]; then
    echo "Removing .bundle directory."
    rm -rf .bundle
else
    echo ".bundle directory does not exist, skipping removal."
fi
echo "Cleanup completed successfully."