import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
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
