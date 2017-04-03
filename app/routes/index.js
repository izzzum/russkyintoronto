import Ember from 'ember';

export default Ember.Route.extend({
    count: 8,
    store: Ember.inject.service(),
      afterModel: function() {
        this.controllerFor('index').set('count', this.get('count'));
        //this.controllerFor('index').set('model', this.get('model'));
    },
    model: function() {
      this.store.adapterFor('post').set('namespace', "method/wall.get");
           return Ember.RSVP.hash({
     posts: this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: this.get('count'), offset: 0, v: '5.7'}),
    });
  },
});
