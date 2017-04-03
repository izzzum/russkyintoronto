import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default Ember.Route.extend({
    model: function(params, transition) {
        let post = this.get('store').peekRecord('post', params.postId);
        if (Ember.isEmpty(post)){
            this.store.adapterFor('post').set('namespace', "method/wall.getById");
            return Ember.RSVP.hash({
            posts: this.store.query('post', {posts: `-164278_${params.postId}`, extended:1, fields: 'profiles', v: '5.7'}),
            });
        }
        else {
            return post;
        }
    }
});
