import EmberLoadRemover from 'ember-load/components/ember-load-remover';
import Ember from 'ember';

export default EmberLoadRemover.extend({
  removeLoadingIndicator() {
    // Perform default behavior
    this._super(...arguments);
    // Do something custom in addition to it
    Ember.$('body').removeClass('loading');
  }
});