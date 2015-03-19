import Ember from 'ember';

export default Ember.Object.extend({
  init: function(){
    this._map = Ember.Object.create();
  },

  get: function(type, id) {
    var typeArray = this._getType(type);
    if(id) {
    /* SINGLE RECORD */
      return typeArray.findBy('__jsim_meta_id', id);
    } else {
    /* ALL RECORDS */
      return typeArray;
    }
  },

  set: function(type, id, record) {
    var typeArray = this._getType(type);
    var cached = typeArray.findBy('__jsim_meta_id', id);
    if(cached) {
      cached.setProperties(record);
      return cached;
    } else {
      var v = record instanceof(Ember.Object) ? record : Ember.Object.create(record);
      Object.defineProperty(v, '__jsim_meta_id', {
        value: id,
        configurable: true
      });
      typeArray.addObject(v);
      return v;
    }
  },

  remove: function(type, record) {
    var typeArray = this._getType(type);
    if(typeof(record) !== "object") {
      // assume it's an id
      record = typeArray.findBy('__jsim_meta_id', record);
    }
    typeArray.removeObject(record);
  },

  clear: function(type) {
    var typeArray = this._getType(type);
    typeArray.splice(0, typeArray.length);
  },

  _getType: function(type) {
    var typeArray = this._map.get(type);
    if(!typeArray){
      this._map.set(type, Ember.A());
      typeArray = this._map.get(type);
    }
    return typeArray;
  }
});
