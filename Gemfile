# frozen_string_literal: true

source "https://rubygems.org"
gemspec

gem "jekyll", "~> 3.7.2"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-paginate", "~> 1.1.0"
end

gem 'wdm', '>= 0.1.0' if Gem.win_platform?

require 'rbconfig'
  if RbConfig::CONFIG['target_os'] =~ /darwin(1[0-3])/i
    gem 'rb-fsevent', '<= 0.9.4'
  end

