import Ember from 'ember';

export default Ember.Controller.extend({
   showLoader: Ember.computed(function() {
        return this.get('model') ? false: true;
    })
});
