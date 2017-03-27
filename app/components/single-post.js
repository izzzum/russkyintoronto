import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['container post'],
    post: null,
    attributeBindings: ['id'],
    id: Ember.computed(function(){
        return `post${this.get('post').id}`;
    }),
    actions: {
    toggleComments() {
      this.toggleProperty('isShowingComments');
    }
  }
});
