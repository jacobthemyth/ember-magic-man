# ember-magic-man
[![Build Status](https://travis-ci.org/jacobthemyth/ember-magic-man.svg?branch=master)](https://travis-ci.org/jacobthemyth/ember-magic-man)

Ember Magic Man is a **lightweight data persistence library for
[Ember.js](http://emberjs.com/)**. Its API is inspired by Ember Data, but it has
no magic and requires the developer to implement all persistence logic.

![](http://media.giphy.com/media/saaJnNQJAZPck/giphy.gif)

Because magic seems great, until it messes you up.

## Installation

* `ember install:addon ember-magic-man`

## Usage

### The Store

In Ember Magic Man, the _store_ is responsible for managing the lifecycle of
your models. Every time you need a model or a collection of models,
you'll ask the store for it.

To create a store, you don't need to do anything. Just by loading the Ember
Magic Man library, all of the routes, controllers, and models in your
application will get a new `store` property. This property is an instance of
`ember-magic-man/store` that will be shared across all of the routes,
controllers, and models in your app.

### Models

```js
// app/models/bookmark.js
import Model from 'ember-magic-man/model';

export default Model.extend({
});
```

### Adapters

One thing you should know is that Ember Magic Man uses an object called an
_adapter_ to know how to talk to your server.

An adapter is just an object that knows how to translate requests from
Ember Magic Man into requests on your server. For example, if I ask the Ember
Magic Man store for a record of type `person` with an ID of `123`, the
adapter translates that into an XHR request to (for example)
`api.example.com/v3/person/123.json`.

### Fetching a Collection of Models

From your route or controller:

```js
this.store.findAll('blogPost');
```

### Fetching a Single Model

```js
this.store.find('blogPost', 123);
```

## Development

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
