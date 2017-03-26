import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['commentsbox'],
    postId: null,
    comments: null,
    store: Ember.inject.service(),
     showComments: Ember.on('didInsertElement', function() {
      Ember.RSVP.hash({
      comments: this.get('store').query('comment', {owner_id: '-164278', post_id: this.get('postId'), extended:1, oauth: 1, /*count: 4, offset: 1,*/ need_likes: 1, v: '5.7'}).then(resolved => {
            let post = this.get('store').peekRecord('post', this.get('postId'));
            resolved.forEach(comment => {
                if(post.get('commentsNum') !== 0){
                    comment.set('post', post);
                    }
            });
        })
    });
  }),
});
