import Ember from 'ember';

export default Ember.Object.extend({
  reload: function(){
    var type = this._typeKey();
    return this.store.find(type, this.id);
  },

  destroy: function(){
    var type = this._typeKey();
    return this.store.destroy(type, this);
  },

  save: function(){
    var type = this._typeKey();
    return this.store.save(type, this);
  },

  _typeKey: function() {
    var typeKey = this.get('typeKey');
    var moduleName = ((this.constructor._toString || "").match(/model:([^:]*):*/) || []).pop();
    var key = typeKey || moduleName;
    if(Ember.isEmpty(key)){
      throw new Ember.Error("No typeKey was found for '" + this + "'");
    }
    return key;
  },

  toJSON: function() {
    return Ember.Object.create(this);
  }
});
