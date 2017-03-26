import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['commentsbox'],
    loadedComments: 10,
    postId: null,
    comments: null,
    commentsNum: null,
    isThereMore: Ember.computed('loadedComments', function(){
       let loadedComments = this.get('loadedComments');
       let commentsNum = this.get('commentsNum');
       console.log(commentsNum);
       console.log(commentsNum > loadedComments);
       console.log(this.get('comments'));
       return commentsNum > loadedComments;
       //let post = this.get('store').peekRecord('post', this.get('postId'));
       //let loadedCommentsNum = post.comments.get('length');
       //console.log(loadedCommentsNum);
    }),
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
    actions: {
    loadMore() {
            Ember.RSVP.hash({
      comments: this.get('store').query('comment', {owner_id: '-164278', post_id: this.get('postId'), extended:1, oauth: 1, offset: this.get('loadedComments'), need_likes: 1, v: '5.7'}).then(resolved => {
            let post = this.get('store').peekRecord('post', this.get('postId'));
            let loadedComments = this.get('loadedComments') + 10;
            this.set('loadedComments', loadedComments);
            resolved.forEach(comment => {
                if(post.get('commentsNum') !== 0){
                    comment.set('post', post);
                    }
            });
        })
    });
    }
  }

});
