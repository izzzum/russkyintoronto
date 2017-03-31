import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['commentsbox'],
    loadedComments: 10,
    isLoading: false,
    loadingStatus: Ember.computed('isLoading', function(){
       return this.get('isLoading');
    }),
    howManyLeft: Ember.computed('loadedComments', function(){
        let left = this.get('commentsNum') - this.get('loadedComments');
        if (left > 10) {
            return `Load next 10 of ${left} comments`;
        }
        else if(left !== 1){
            return `Load ${left} more comments`;
        }
        else{
            return `Load ${left} more comment`;
        }
    }),
    postId: null,
    comments: null,
    commentsNum: null,
    isThereMore: Ember.computed('loadedComments', function(){
       let post = this.get('store').peekRecord('post', this.get('postId'));
       let commentsNum = post.get('commentsNum');
       if(Ember.isEmpty(post.get('comments'))) {
           return commentsNum > this.get('loadedComments');
       }
       else {
           this.set('loadedComments', post.get('comments').content.length)
           return commentsNum > post.get('comments').content.length;  
       }
    }),
    store: Ember.inject.service(),
     showComments: Ember.on('didInsertElement', function() {
      this.set('isLoading', true);
      Ember.RSVP.hash({
      comments: this.get('store').query('comment', {owner_id: '-164278', post_id: this.get('postId'), extended:1, oauth: 1, /*count: 4, offset: 1,*/ need_likes: 1, v: '5.7'}).then(resolved => {
            let post = this.get('store').peekRecord('post', this.get('postId'));
            let counter = 0;
            resolved.forEach(comment => {
                if (counter++ === resolved.content.length - 1){
                    post.set('commentsNum', comment.get('commentsNum'));
                }
                if(comment.get('commentsNum') !== 0){
                    comment.set('post', post);
                    }
            });
            this.set('isLoading', false);
        })
    });
  }),
    actions: {
    loadMore() {
        this.set('isLoading', true);
            Ember.RSVP.hash({
      comments: this.get('store').query('comment', {owner_id: '-164278', post_id: this.get('postId'), extended:1, oauth: 1, offset: this.get('loadedComments'), need_likes: 1, v: '5.7'}).then(resolved => {
            let post = this.get('store').peekRecord('post', this.get('postId'));
            let loadedComments = this.get('loadedComments') + resolved.content.length;
            this.set('loadedComments', loadedComments);
            let counter = 0;
            resolved.forEach(comment => {
                if (counter++ === resolved.content.length - 1){
                    post.set('commentsNum', comment.get('commentsNum'));
                }
                if(post.get('commentsNum') !== 0){
                    comment.set('post', post);
                    }
                    this.set('isLoading', false);
            });
        })
    });
    }
  }

});
