---
title: Creating a DSL with Ruby
date: "2020-04-20T22:10:24.284Z"
---

> Domain-Specific Languages (DSLs) provides a fluent interface with a higher level of abstraction, optimized for dealing with a specific class of problem. 

Frameworks like [RSpec](https://rspec.info/), [Cucumber](https://cucumber.io/) and [Watir](http://watir.com/) come with their own set of DSL. These DSLs make working with these frameworks easy for programmers and non-programmers. Unlike general-purpose language (GPL), which is broadly applicable across domains, DSLs are lightweight and can't be used to build a full-fledged application.

To learn more about DSLs, Martin Fowler did a great job [explaining DSLs in greater detail](https://martinfowler.com/books/dsl.html).

In this article, my objective is to create a DSL for interacting with forms on any webpage. We want to give people the ability to automate form filling and submission. We are not going to implement the actual mechanism for filling out the forms - I will leave this to your imagination. However, our focus will be on getting the construct of the DSL to do stuff.

Below is how the DSL will be used once completed. So how do we make this happen?

```ruby
FormBot.visit 'https://www.example.com/register' do
  in_form 'Registration'

  fill_in 'First Name', with: 'Jolly'
  fill_in 'Last Name', with: 'Roger'

  select_from 'City', value: 'Kansas'
  select_from 'Gender', value: 'Male'
  select_from 'Colors', value: ['Red', 'Yellow']

  submit do |response|
    if response.failure
      send_mail to: 'admin@example.com',
                from: 'formbot@example.com',
                subject: 'Failed to submit form',
                body: response.errors
    end
  end
end
```
\
In the above snippet, we have an identifier `FormBot` which receives a message `visit`. 

The `visit` class method takes in a string(url) and a block. One way of implementing this is to create a class and define a class-level method `visit` that takes a string and a block.

```ruby
class FormBot 
  def self.visit(url, &block)
    puts "Visiting #{url}"
    yield block
  end
end
```
\
While this work, a module is best suited for implementing the DSL because all we want is behaviour. We won't be creating new instances of our DSL everytime we want to use it, rather we will just call it's method. Think about RSpec if you have ever used it you don't create a new instance of RSpec everytime you write a new spec. A class will be more appropriate when we are concern about the state of the object, in this case we aren't.

The above piece of code using a module can be refactored as:

```ruby
module FormBot
	extend self

  def self.visit(url, &block)
    puts "Visiting #{url}"
    yield block
  end
end
```
Notice the use of `extend self`. This allows us to call the methods in the module directly on the module as class methods,

The other piece of the puzzle is figuring out how to get the constructs in the DSL working work like fill_in, select, and submit. If you take a closer look, these are just method call with Ruby's syntactic sugar. One of such syntactic sugar can be found in RSpec. In Rspec you can do 

```ruby
let(:first_name)  { 'Simon Peter' }
```

`let` here is just a method call that takes a block. One way you can implement the above would be 

```ruby
def let(symbol, &block)
  define_method symbol, &block
end
```

That's it you just implemented a minimal version of [RSpec's let](https://relishapp.com/rspec/rspec-core/v/3-9/docs/helper-methods/let-and-let). 


Just like in the RSpec `let` example above, our DSL construct `fill_in`, `select` and `submit` are made possible by executing the method in the context of the module instance. One way to achieve is to use the `instance_eval` method.

## Enter eval

[`eval`](https://en.wikipedia.org/wiki/Eval) are a generic way of executing code as string. They are common across most programming language. For instance the following piece of code is valid in Ruby and JavaScript 

```ruby
first_name = "the"
eval("first_name + 'terminalguy'")
```

Ruby takes eval to another level by providing us with two other variants
- [class_eval](https://ruby-doc.org/core-2.5.0/Module.html#method-i-class_eval)
- [instance_eval](https://ruby-doc.org/core-2.7.0/BasicObject.html#method-i-instance_eval)

To wrap up implementing our DSL we will be using `instance_eval`. Here is the updated version of our code

```ruby
module FormBot
  extend self

  def visit(url, &block)
    puts "Visiting #{url}"
    instance_eval(&block)
    # TODO: add logic for visiting url
	end
	
  def in_form(form_name)
    puts "Found form #{form_name}"
    # TODO: add logic for finding form
	end

  def fill_in(field_name, with:)
    puts "Filling in #{field_name} with #{with}"
    # TODO: add logic for filling in form field
  end

  def select_from(field_name, value:)
    puts "Selecting #{value} from #{field_name}"
    # TODO: add logic for selecting form field
  end

  def submit
    # Here we are faking a failed response 
    # after the form has been submitted

    response = OpenStruct.new(failure: true, errors: ['error1'])
    yield response if block_given?
    
    # TODO: add logic for submitting form
  end
end
```
\
The only part that needs explaining is the the `instance_eval` used in the `visit` method. Here we are telling Ruby to execute the block within the context of the receiver, in this case the module. The block you pass to the visit method, will be passed down to `instance_eval` which also takes a block, the code in the body of the block are then executed within the content of the `FormBot ` module (the receiver).

And don't forget to add the `send_mail` method

```ruby
def send_mail(to:, from:, subject:, body:)
  puts "Sending mail to: #{to}"
  puts "From: #{from}"
  puts "Subject: #{subject}"
  puts "Body: #{body}"
end
```

Now running our code will produce this output

```
Visiting https://www.example.com/register
Found form Registration
Filling in First Name with Jolly
Filling in Last Name with Roger
Selecting Kansas from City
Selecting Male from Gender
Selecting ["Red", "Yellow"] from Colors
Sending mail to: admin@example.com
From: formbot@example.com
Subject: Failed to submit form
Body: ["error1"]
```
\
That's it, you now have your own custom DSL built with ruby.

[Complete source code](https://gist.github.com/theterminalguy/799cee333e02777424d642e8a5434608)
