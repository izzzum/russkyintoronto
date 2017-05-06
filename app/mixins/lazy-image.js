import Ember from 'ember';
import LazyImage from 'ember-lazy-image/mixins/lazy-image';

export default Ember.Mixin.create(LazyImage,{
  handleImageUrl: Ember.on('init', function() {
    this._setImageUrl();
  })
});