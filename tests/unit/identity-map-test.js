import Ember from 'ember';
import IdentityMap from 'ember-magic-man/identity-map';
import { module, test } from 'qunit';

module('identityMap', {
  beforeEach: function() {
    this.subject = IdentityMap.create();
  }
});

test('getting a non present id', function(assert) {
  assert.ok(!this.subject.get('type', 'someid'));
});

test('getting a present id', function(assert) {
  var thing = {};
  this.subject.set('type', 'someid', thing);
  assert.ok(this.subject.get('type', 'someid'));
});

test('getting an empty type is empty', function(assert) {
  var typeArray = this.subject.get('type');
  assert.ok(Ember.isArray(typeArray));
  assert.strictEqual(typeArray.length, 0);
});

test('getting an non empty type is non empty', function(assert) {
  var typeArrayA = this.subject.get('type');

  var thing = {};
  this.subject.set('type', 'someid', thing);

  var typeArrayB = this.subject.get('type');

  assert.strictEqual( typeArrayA, typeArrayB );
  assert.strictEqual( typeArrayA.get('firstObject'), typeArrayB.get('firstObject') );
  assert.strictEqual( typeArrayA.length, 1 );
  assert.strictEqual( typeArrayB.length, 1 );
});

test('setting an id should update that id if it already exists', function(assert) {
  var thing = {};
  this.subject.set('type', 'someid', thing);

  var resultA = this.subject.get('type', 'someid');

  var otherThing = {name: 'thing'};
  this.subject.set('type', 'someid', otherThing);

  var resultB = this.subject.get('type', 'someid');

  assert.strictEqual(resultA, resultB);
  assert.strictEqual(resultA.get('name'), 'thing');

});

test('set should return same object if it already exists', function(assert){
  var thing = this.subject.set('type', 'someid', {});
  var same = this.subject.set('type', 'someid', {same: true});
  assert.strictEqual(thing, same);
});

test('create Ember.Object if not already', function(assert) {
  var thing = {};
  this.subject.set('type', 'someid', thing);
  assert.ok(this.subject.get('type', 'someid') instanceof(Ember.Object) );

  var object = Ember.Object.create();
  this.subject.set('type', 'otherid', object);
  assert.strictEqual(this.subject.get('type', 'otherid'), object);
});

test('removing a record', function(assert) {
  this.subject.set('type', 'someid', {});
  var thing = this.subject.get('type', 'someid');
  this.subject.remove('type', thing);

  assert.ok( ! this.subject.get('type', 'someid') );

  var typeArray = this.subject.get('type');
  assert.equal( typeArray.length, 0 );
});

test('removing an id', function(assert) {
  this.subject.set('type', 'someid', {});
  var thing = this.subject.get('type', 'someid');
  this.subject.remove('type', 'someid');

  assert.ok( ! this.subject.get('type', 'someid') );

  var typeArray = this.subject.get('type');
  assert.equal( typeArray.length, 0 );
});

test('clearing a type', function(assert){
  this.subject.set('type', 'someid', {});
  var typeArray = this.subject.get('type');

  assert.equal(typeArray.length, 1);
  this.subject.clear('type');
  assert.equal(typeArray.length, 0);
});

test('private id should not be enumerable', function(assert) {
  this.subject.set('type', 'someid', {});
  var thing = this.subject.get('type', 'someid');

  assert.strictEqual(thing.hasOwnProperty('__jsim_meta_id'), true);
  assert.strictEqual(thing.propertyIsEnumerable('__jsim_meta_id'), false);
});
