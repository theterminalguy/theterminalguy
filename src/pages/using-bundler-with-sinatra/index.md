---
title: Using Bundler with Sinatra 
date: "2018-03-23T22:12:03.284Z"
---

If you plan to deploy your sinatra application to a PaaS like Heroku or any other service, you will benefit a whole lot from using Bundler. In rails you simply add all your application's dependency to a file called **Gemfile** and then run `$ bundle install` this is made possible with bundler. 

> Bundler provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.
> 
> -- Source bundler.io 

**In summary, bundler exist for the following reasons**

1. To combat Dependency hell
2. To provide easy gem management for the various applicaiton environment. This could be test, development, staging, production or whatever a team/developer choose to call it. 

To use bundler on your current sinatra application, just create a file `Gemfile` and add all your dependency. For instance, if we had a sinatra app in a file called `app.rb` with the following content 

```ruby 
require 'sinatra'

get '/about' do
  halt 200, 'This is a sinatra application'
end
```

You can get rid of the require statements and add this to your Gemfile instead

```
gem 'sinatra'
gem 'redis'
```

So you end up with `app.rb` that looks like this. 

```ruby
get '/about' do
  halt 200, 'This is a sinatra application'
end
```

Next run `$ bundle install` this will create another file `Gemfile.lock` file in your current directory - more about this later. 

**Note:** You don't need to get rid of the require statement if you are loading core ruby classes e.g `ruby require net/http` but if you application depends on a custom library then you can get rid of that and add it straight to the Gemfile. 

### How do you run your app?

`$ ruby app.rb` that was how you ran your app before bundler. That approach would not work now that we are using bundler. To run your app, you will need to use the `rackup` command, this is needed for all rack based apps. This command only works if a `config.ru` file is present in your application directory. So lets create one with the following content 

```ruby
require 'rubygems'
require 'bundler'

Bundler.require 

require_relative './app'
run Sinatra::Application
```

Now if you run the command `$ rackup` your application should boot up and let you know what port its running on. This approach runs your sinatra app using sinatra's classical style. If you app is extending either `Sinatra::Base` or `Sinatra::Application` like in the example below 

```ruby
class Application < Sinatra::Base
  get '/about' do
    halt 200, 'This is a sinatra application'
  end
end
```
Then the last line in your `config.ru` would be 
```ruby
run Application
```


### Benefits of this approach

Without bundler, if we ship our application to another machine, and we try to run our app, ruby would use whatever version of our application's gem it finds on that machine.

 This can cause a lot of problems which could be very hard to debug and that is the reason bundler creates a `Gemfile.lock` file, so when you deploy your application to a new machine, if the user runs `bundle install` to install dependencies, bundler will pull the exact version(s) you app requires. This very technique prevents you from dependency hell.  

[Here](https://www.cloudcity.io/blog/2015/07/10/how-bundler-works-a-history-of-ruby-dependency-management/) is a detailed article on how bundler achieves this with the help of rubygems.

Thank you for reading. 

