import Ember from 'ember';

export default Ember.Component.extend({
    simple: false,
    classNames: ['container post'],
    post: null,
    attributeBindings: ['id'],
    id: Ember.computed(function(){
        return `post${this.get('post').id}`;
    }),
    isReposted: Ember.computed('post', function(){
        return this.get('post').get('reposts') !== '0';
    }),
    isLiked: Ember.computed(function(){
        return this.get('post').get('likes') !== '0';
    }),
    actions: {
    toggleComments() {
      this.toggleProperty('isShowingComments');
    }
  }
});
