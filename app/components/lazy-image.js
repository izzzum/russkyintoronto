import Ember from 'ember';
import LazyImage from 'ember-lazy-image/components/lazy-image';
import LazyImageMixin  from '../mixins/lazy-image';

export default LazyImage.extend(LazyImageMixin, {
  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportUseRAF      : true,
      viewportSpy         : false,
      viewportRefreshRate : 150,
      viewportTolerance: {
        top    : 50,
        bottom : 50,
        left   : 20,
        right  : 20
      }
    });
  })
});