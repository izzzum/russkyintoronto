import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),
    model() {
           return Ember.RSVP.hash({
      posts: this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: 8, offset: 0, v: '5.7'}),
    });
  },
});
