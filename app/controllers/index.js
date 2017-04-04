import Ember from 'ember';

export default Ember.Controller.extend({
   list: {},
   displayStats:false,
   store: Ember.inject.service(),
   loadedPortion: 8,
   statsAmmount: 50,
   showLoader: Ember.computed(function() {
        return this.get('model.posts') ? false: true;
    }),
    actions: {
    getStats() {
        if(this.get('displayStats')) {
            this.set('displayStats', false);
            Ember.$('body').toggleClass("no-scroll");
        } else {
        Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100) //need to fix on mobile
            }, 500);

        let sortByNumber = function(a, b) {
                return ((a.items > b.items) ? -1 : ((a.items === b.items) ? 0 : 1));
            };

        this.set('showLoader', true);
      let store = this.get('store');
        let posts = store.peekAll('post');
            posts.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            Ember.run.later(function(){
                                store.query('comment', {owner_id: '-164278', post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'}).then(function(resolved){
                                    resolved.forEach(comment =>{
                                        comment.set('post', post);
                                    });
                                });
                            }, Math.ceil(Math.random()*5000));
                        }
                    }
                });
        let promise;
        let realThis = this;
        if(!Ember.isEmpty(posts) && posts.content.length < this.get('statsAmmount')) {
            this.store.adapterFor('post').set('namespace', "method/wall.get");
            posts = this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: this.get('statsAmmount')-posts.content.length, offset: posts.content.length, v: '5.7'});
            this.set('loadedPortion', this.get('statsAmmount'));
            this.set('posts', posts);
            posts.then(function(resolved){
                resolved.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            Ember.run.later(function(){
                                promise = store.query('comment', {owner_id: '-164278', post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'});
                                promise.then(function(resolved){
                                    resolved.forEach(comment =>{
                                        comment.set('post', post);
                                    });
                                });
                            }, Math.ceil(Math.random()*5000));
                        }
                    }
                }); 
           }).finally(function(){
                                Ember.run.later(function(){
                           
promise.finally(function(){

        let listOfComments = [];
        let listOfPosts = [];
        let listOfTopCommented = [];
        let listOfMostLikedComments = [];
        let userNum = 0;
        let commentsNum = 0;
        let postsNum = 0;
        let users = store.peekAll('user');
            users.forEach(user =>{
                userNum++;
                listOfComments.push({user: store.peekRecord('user', user.get('id')), items: user.get('comments').content.currentState.length});
                listOfPosts.push({user: store.peekRecord('user', user.get('id')), items: user.get('posts').content.currentState.length});
            });

        posts = store.peekAll('post');
            posts.forEach(post =>{
                postsNum++;
                listOfTopCommented.push({post: store.peekRecord('post', post.get('id')), items: post.get('commentsNum')});
            });

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                commentsNum++;
                listOfMostLikedComments.push({comment: store.peekRecord('comment', comment.get('id')), items: comment.get('likes')});
            });

            listOfComments = listOfComments.sort(sortByNumber).slice(0,3);
            listOfPosts = listOfPosts.sort(sortByNumber).slice(0,3);
            listOfTopCommented = listOfTopCommented.sort(sortByNumber).slice(0,3);
            listOfMostLikedComments = listOfMostLikedComments.sort(sortByNumber).slice(0,3);

            realThis.set('list.topCommentsUsers', listOfComments);
            realThis.set('list.topPostsUsers', listOfPosts);
            realThis.set('list.topCommentedPosts', listOfTopCommented);
            realThis.set('list.mostLikedComments', listOfMostLikedComments);
            realThis.set('list.commentsNum', commentsNum);
            realThis.set('list.userNum', userNum);
            realThis.set('list.postsNum', postsNum);
            /*console.log(listOfComments);
            console.log(listOfPosts);
            console.log(listOfTopCommented);
            console.log(listOfMostLikedComments);*/
            realThis.set('showLoader', false);
            realThis.set('displayStats', true);
            //Ember.$('.overlay').toggleClass("hide");
             Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100) //need to fix on mobile
            }, 500);
            Ember.$('body').toggleClass("no-scroll");

            });

            }, 10000);

                  
        });
    }
    else {
            //**DUPLICATE */

     Ember.run.later(function(){

        let listOfComments = [];
        let listOfPosts = [];
        let listOfTopCommented = [];
        let listOfMostLikedComments = [];
        let userNum = 0;
        let commentsNum = 0;
        let postsNum = 0;
        let users = store.peekAll('user');
            users.forEach(user =>{
                userNum++;
                listOfComments.push({user: store.peekRecord('user', user.get('id')), items: user.get('comments').content.currentState.length});
                listOfPosts.push({user: store.peekRecord('user', user.get('id')), items: user.get('posts').content.currentState.length});
            });

        posts = store.peekAll('post');
            posts.forEach(post =>{
                postsNum++;
                listOfTopCommented.push({post: store.peekRecord('post', post.get('id')), items: post.get('commentsNum')});
            });

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                commentsNum++;
                listOfMostLikedComments.push({comment: store.peekRecord('comment', comment.get('id')), items: comment.get('likes')});
            });

            listOfComments = listOfComments.sort(sortByNumber).slice(0,3);
            listOfPosts = listOfPosts.sort(sortByNumber).slice(0,3);
            listOfTopCommented = listOfTopCommented.sort(sortByNumber).slice(0,3);
            listOfMostLikedComments = listOfMostLikedComments.sort(sortByNumber).slice(0,3);

            realThis.set('list.topCommentsUsers', listOfComments);
            realThis.set('list.topPostsUsers', listOfPosts);
            realThis.set('list.topCommentedPosts', listOfTopCommented);
            realThis.set('list.mostLikedComments', listOfMostLikedComments);
            realThis.set('list.commentsNum', commentsNum);
            realThis.set('list.userNum', userNum);
            realThis.set('list.postsNum', postsNum);

            realThis.set('showLoader', false);
            realThis.set('displayStats', true);
            //Ember.$('.overlay').toggleClass("hide");
             Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100) //need to fix on mobile
            }, 500);
            Ember.$('body').toggleClass("no-scroll");

}, 10000);
            //**DUPLICATE */

/*
            this.set('showLoader', false);
            this.set('displayStats', true);
            //Ember.$('.overlay').toggleClass("hide");
            Ember.$('body').toggleClass("no-scroll");*/
    }

        }
    //setTimeout(function(){
        /*this.set('list.posts', store.peekAll('post'));
        this.set('list.users', store.peekAll('user'));
        this.set('list.comments', store.peekAll('comment'));*/
/*
        let sortByNumber = function(a, b) {
                return ((a.items > b.items) ? -1 : ((a.items == b.items) ? 0 : 1));
            };

        let listOfComments = [];
        let listOfPosts = [];
        let listOfTopCommented = [];
        let listOfMostLikedComments = [];

        let users = store.peekAll('user');
            users.forEach(user =>{
                listOfComments.push({user: user.get('id'), items: user.get('comments').content.currentState.length});
                listOfPosts.push({user: user.get('id'), items: user.get('posts').content.currentState.length});
            });

        
            posts.forEach(post =>{
                listOfTopCommented.push({post: post.get('id'), items: post.get('commentsNum')});
            });

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                listOfMostLikedComments.push({comment: comment.get('id'), items: comment.get('likes')});
            });

            listOfComments.sort(sortByNumber);
            listOfPosts.sort(sortByNumber);
            listOfTopCommented.sort(sortByNumber);
            listOfMostLikedComments.sort(sortByNumber);

            console.log(listOfComments);
            console.log(listOfPosts);
            console.log(listOfTopCommented);
            console.log(listOfMostLikedComments);
*/
   // }), 50000; //lagged
    }
  }
    
       /* getComments: Ember.computed('model', function() {
        var model = this.get('model');
        var store = this.get('store');
        model.posts.forEach(function(post){
            return Ember.RSVP.hash({
            comments: store.query('comment', {owner_id: '-164278', post_id: post.id, extended:1, oauth: 1, count: 4, offset: 1, need_likes: 1, v: '5.7'})
        });
        });
    })*/
});

// comments: store.query('comment', {owner_id: '-164278', post_id: post.id, extended:1, oauth: 1, /*count: 4, offset: 1,*/ need_likes: 1, v: '5.7'})
/*
            Ember.RSVP.hash({
            comments: this.get('store').query('comment', {owner_id: '-164278', post_id: this.get('postId'), extended:1, oauth: 1, /*count: 4, offset: 1,*//* need_likes: 1, v: '5.7'}).then(resolved => {
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
            });*/