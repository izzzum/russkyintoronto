import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['container post'],
    post: null,
    actions: {
    toggleComments() {
      this.toggleProperty('isShowingComments');
    }
  }
});
