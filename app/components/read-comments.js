import Ember from 'ember';

export default Ember.Component.extend({
    postId: null,
    comments: null,
    store: Ember.inject.service(),
     showComments: Ember.on('didInsertElement', function() {
      //let commentIds = [];
      Ember.RSVP.hash({
      //user: this.store.queryRecord('user', {user_id: 567*34, v: '5.0'}),
      //posts: this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: 8, /*offset: 1,*/ v: '5.7'}),
      comments: this.get('store').query('comment', {owner_id: '-164278', post_id: this.get('postId'), extended:1, oauth: 1, /*count: 4, offset: 1,*/ need_likes: 1, v: '5.7'}).then(resolved => {
            let post = this.get('store').peekRecord('post', this.get('postId'));
            resolved.forEach(comment => {
                //comment.set('post', this.get('post'));
                
                if(post.get('commentsNum') != 0){
                    comment.set('post', post);
                        //commentIds.push(comment.get('id'));
                        //if(commentIds.length === post.get('commentsNum')){
                       // console.log(commentIds);
                       //this.set('comments', commentIds);
                      


// this.get('store').unloadRecord(post);
//    this.get('store').push({
//   data: {
//     // primary data for single record of type `Person`
//     id: post.get('id'),
//     type: 'post',
//     attributes: {
//       comments: commentIds
//     }
//   }
// });


                        //post.set('comments', commentIds);
                        //}
                    }
            });
             //let posts = {};
            // posts.posts = {id: this.get('post'), commentIds: this.get('commentIds')};
            // console.log(commentIds);
             
          
             

        })
    });

    
    // .then(function(comment) {
    //     post.set('comments', user);
    // });
  }),
 /* comments: Ember.computed(function(){
      let comments = this.get('store').peekAll('comment');
      return comments;
  })*/

});
