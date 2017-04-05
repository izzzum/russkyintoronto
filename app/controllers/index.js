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
    scrollTop(){
            Ember.$('body').stop().animate({
                scrollTop: (Ember.$('.page-header').offset().top-100)
            }, 1000);
    },
    scrollBot(){
            Ember.$('body').stop().animate({
                scrollTop: (Ember.$('.page-footer').offset().top-100)
            }, 1000);
    },
    getStats() {
        let realThis = this;
        if(this.get('displayStats')) {
            Ember.$('.statistics').animate({
                height: "0%"
            }, 500, function(){
                realThis.set('displayStats', false);
                Ember.$('body').toggleClass("no-scroll");
            });
        } else {
        Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100)
            }, 500);

        let sortByNumber = function(a, b) {
                return ((parseInt(a.items) > parseInt(b.items)) ? -1 : ((parseInt(a.items) === parseInt(b.items)) ? 0 : 1));
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
                listOfComments.push({user: user, items: user.get('comments').content.currentState.length});
                listOfPosts.push({user: user, items: user.get('posts').content.currentState.length});
            });

        posts = store.peekAll('post');
            posts.forEach(post =>{
                postsNum++;
                listOfTopCommented.push({post: post, items: post.get('commentsNum')});
            });

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                commentsNum++;
                listOfMostLikedComments.push({comment: comment, items: comment.get('likes')});
            });

            listOfComments.sort(sortByNumber);
            listOfComments = listOfComments.slice(0,5);
            listOfPosts.sort(sortByNumber);
            listOfPosts = listOfPosts.slice(0,3);
            if(listOfPosts[2].items === 1){
                listOfPosts = listOfPosts.slice(0,2);
            }
            listOfTopCommented.sort(sortByNumber);
            listOfTopCommented = listOfTopCommented.slice(0,3);
            listOfMostLikedComments.sort(sortByNumber);
            listOfMostLikedComments = listOfMostLikedComments.slice(0,3);

            realThis.set('list.topCommentsUsers', listOfComments);
            realThis.set('list.topPostsUsers', listOfPosts);
            realThis.set('list.topCommentedPosts', listOfTopCommented);
            realThis.set('list.mostLikedComments', listOfMostLikedComments);
            realThis.set('list.commentsNum', commentsNum);
            realThis.set('list.userNum', userNum);
            realThis.set('list.postsNum', postsNum);

            realThis.set('showLoader', false);
            realThis.set('displayStats', true);
            Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100)
            }, 500);
            Ember.$('body').toggleClass("no-scroll");
            //animate
            Ember.run.later(function(){
            Ember.$('.statistics').stop().animate({
                height: "98%"
            }, 500, function(){
                console.log('stats opened');
            });
            }, 600);


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
                listOfComments.push({user: user, items: user.get('comments').content.currentState.length});
                listOfPosts.push({user: user, items: user.get('posts').content.currentState.length});
            });

        posts = store.peekAll('post');
            posts.forEach(post =>{
                postsNum++;
                listOfTopCommented.push({post: post, items: post.get('commentsNum')});
            });

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                commentsNum++;
                listOfMostLikedComments.push({comment: comment, items: comment.get('likes')});
            });

            listOfComments.sort(sortByNumber);
            listOfComments = listOfComments.slice(0,5);
            listOfPosts.sort(sortByNumber);
            listOfPosts = listOfPosts.slice(0,3);
            if(listOfPosts[2].items === 1){
                listOfPosts = listOfPosts.slice(0,2);
            }
            listOfTopCommented.sort(sortByNumber);
            listOfTopCommented = listOfTopCommented.slice(0,3);
            listOfMostLikedComments.sort(sortByNumber);
            listOfMostLikedComments = listOfMostLikedComments.slice(0,3);

            realThis.set('list.topCommentsUsers', listOfComments);
            realThis.set('list.topPostsUsers', listOfPosts);
            realThis.set('list.topCommentedPosts', listOfTopCommented);
            realThis.set('list.mostLikedComments', listOfMostLikedComments);
            realThis.set('list.commentsNum', commentsNum);
            realThis.set('list.userNum', userNum);
            realThis.set('list.postsNum', postsNum);

            realThis.set('showLoader', false);
            realThis.set('displayStats', true);
            Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100)
            }, 500);
            Ember.$('body').toggleClass("no-scroll");
            //animate
            Ember.run.later(function(){
            Ember.$('.statistics').stop().animate({
                height: "98%"
            }, 500, function(){
                console.log('stats opened');
            });
            }, 600);

}, 10000);
            //**DUPLICATE */
    }

        }
    }
  }
});
