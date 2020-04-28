---
title: Understanding Elixir's Pin Operator
date: "2020-04-28T23:07:00.121Z"
---

> The best way to understand Elixir's pin operator `^` is with relatable examples. 

##### Problem:

Users are allowed to change their passwords before they do, they will have to provide a new password and their previous password. 

##### Solution:

In a language like JavaScript, we can write a naive solution like so 

```javascript 
let current_password = 'secret-1';

const params = {
  new_password: 'secret-2',
  current_password: 'secret-2'
}

if (current_password !== params.current_password) {
  throw "Match Error"
}
```
\
The above will throw a `Match Error` because the user's supplied password does not match their current password


Using Elixir's [pin operator](https://elixir-lang.org/getting-started/pattern-matching.html#the-pin-operator) we can write the above as 

```elixir
current_password = 'secret-1'

{ new_password, ^current_password } = { 'secret-2', 'secret-2'}
```

The above will also rais a `MatchError` exception

##### Explanation:

Use the pin operator `^` to pattern match against an existing variable's value. In the Elixir's example above, the variable `new_password` is bound to the first item in the tuple (Elixirs data structure represented with `{}`), rather than rebinding the `current_password` variable, we pattern match against its existing value. 

Now this example from Elixir's docs should make sense. 

```shell
iex(1)> x = 1
1
iex(2)> ^x = 1 # Matches previous value 1
1
iex(3)> ^x = 2 # Does not match previous value 
** (MatchError) no match of right hand side value: 2
```

