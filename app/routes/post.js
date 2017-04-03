import Ember from 'ember';

export default Ember.Route.extend({
    params: null,
    model: function(params) {
        this.set('params', params);
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
    },
    afterModel: function() {
        let params = this.get('params');
        this.controllerFor('post').set('postId', params.postId);
    }
});
