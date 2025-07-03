# mijug-dot-net

- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- 

## Setup Jekyll

- [Jekyll on Ubuntu](https://jekyllrb.com/docs/installation/ubuntu/)
- `sudo apt-get install ruby-full build-essential zlib1g-dev`

```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

`gem install jekyll bundler`

### Change Jekyll Defaults for Github Pages

- Update Gemfile to use gh-pages instead of jekyll, to ensure rendering is the same
- Update _config.yml to exclude `docs/` and `scripts/` folders, the `docs/` folder will be the live site
- Create scripts/deploy.sh, builds with production environment setting, copy to docs folder, add all, commit all

