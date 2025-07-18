cd "$(dirname "$0")/.."
echo "Starting deployment to GitHub Pages repository main branch."
if [ ! -d .git ]; then
  echo "This directory is not a Git repository. Exiting."
  exit 1
fi
if [ ! -f Gemfile ]; then
  echo "Gemfile not found. Please ensure you are in the correct directory."
  exit 1
fi
echo "Installing dependencies from Gemfile."
bundle config set path 'vendor/bundle'
bundle config set without 'development test'
RUBYZIP_V3_API_WARN=1 bundle install
if [ $? -ne 0 ]; then
  echo "Bundle install failed. Exiting."
  exit 1
fi
echo "Dependencies installed successfully. Building Jekyll site."
if [ ! -f _config.yml ]; then
  echo "_config.yml not found. Please ensure you are in the correct directory."
  exit 1
fi
if [ ! -d _site ]; then
  echo "Creating _site directory."
  mkdir _site
fi
echo "Building Jekyll site with production environment."
JEKYLL_ENV=production bundle exec jekyll build
if [ $? -ne 0 ]; then
  echo "Jekyll build failed. Exiting."
  exit 1
fi
echo "Jekyll build succeeded. Deploying to GitHub Pages."
if [ ! -d docs ]; then
  echo "Creating docs directory."
  mkdir docs
fi
echo "Copying built site to docs directory."
cp -r _site/* docs/
if [ $? -ne 0 ]; then
  echo "Failed to copy files to docs directory. Exiting."
  exit 1
fi
echo "Copying CNAME file if it exists."
if [ -f CNAME ]; then
  cp CNAME docs/
  if [ $? -ne 0 ]; then
    echo "Failed to copy CNAME file. Exiting."
    exit 1
  fi
else
  echo "CNAME file not found, skipping copy."
fi

git add -A
git commit -m "Deploy script commit to main"
git push origin main
if [ $? -ne 0 ]; then
  echo "Git push failed. Exiting."
  exit 1
fi
echo "Push to GitHub Pages repository main branch completed successfully."
# If you want to deploy to a different branch, uncomment the following line and change 'gh-pages' to your desired branch.
# Uncomment the next lines to push to gh-pages branch; ensure you have the branch set up and its not protected.
# echo "Pushing to gh-pages branch."
# git push origin main:gh-pages
# if [ $? -ne 0 ]; then
#   echo "Git push to gh-pages branch failed. Exiting."
#   exit 1
# fi
# echo "Deployment to gh-pages branch completed successfully."