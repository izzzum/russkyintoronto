import Ember from 'ember';

export default Ember.Controller.extend({
   showLoader: Ember.computed(function() {
        return this.get('model') ? false: true;
    }),
    showme: Ember.computed('model', function() {
    var logs = this.get('model');
    logs.posts.forEach(function(post){
        console.log(post);
    });
  })
});
