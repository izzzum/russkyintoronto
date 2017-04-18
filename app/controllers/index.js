import Ember from 'ember';
import delay from 'ember-delay/delay';

export default Ember.Controller.extend({
   list: {},
   sortByNumber: function(a, b) {
        return ((parseInt(a.items) > parseInt(b.items)) ? -1 : ((parseInt(a.items) === parseInt(b.items)) ? 0 : 1));
    },
   promise: null,
   totalNum: 0,          
   loadingState: 0,
   displayStats:false,
   scrollPosition: null,
   store: Ember.inject.service(),
   loadedPortion: 8,
   statsAmmount: 50,
   statsInfoLoader: false,
   showLoader: Ember.computed(function() {
        return this.get('model.posts') ? false: true;
    }),
    actions: {
    computeAllThisShit(){
       /** Compute all this shit send from getStats()*/
        let store = this.get('store');
        let sortByNumber = this.get('sortByNumber');
        let listOfComments = [];
        let listOfPosts = [];
        let listOfTopCommented = [];
        let listOfMostLikedComments = [];
        let listOfOverallLikes = [];
        let userNum;
        let commentsNum;
        let postsNum;
        let likesNum = 0;

        let posts = store.peekAll('post');
            posts.forEach(post =>{
                listOfTopCommented.push({post: post, items: post.get('commentsNum')});
            });
        postsNum = posts.content.length;

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                listOfMostLikedComments.push({comment: comment, items: comment.get('likes')});
            });
        commentsNum = comments.content.length;
            
        let users = store.peekAll('user');
            users.forEach(user =>{
                likesNum += parseInt(user.get('likes'));
                listOfComments.push({user: user, items: user.get('leftComments')});
                listOfPosts.push({user: user, items: user.get('leftPosts')});
                listOfOverallLikes.push({user: user, items: user.get('likes')});
            });
        userNum = users.content.length;

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
            listOfOverallLikes.sort(sortByNumber);
            listOfOverallLikes = listOfOverallLikes.slice(0,5);

            this.set('list.topCommentsUsers', listOfComments);
            this.set('list.topPostsUsers', listOfPosts);
            this.set('list.topCommentedPosts', listOfTopCommented);
            this.set('list.mostLikedComments', listOfMostLikedComments);
            this.set('list.listOfOverallLikes', listOfOverallLikes);
            this.set('list.commentsNum', commentsNum);
            this.set('list.userNum', userNum);
            this.set('list.postsNum', postsNum);
            this.set('list.likesNum', likesNum);

            this.set('statsInfoLoader', false);
            this.set('displayStats', true);
            Ember.$('body').toggleClass("no-scroll");
            this.set('scrollPosition', Ember.$('body').scrollTop());
            //animate
            Ember.run.later(function(){
            /*Ember.$('body').stop().animate({
            scrollTop: (Ember.$('.page-header').offset().top-100)
            }, 50);*/
            Ember.$('.statistics').animate({
                height: "98%"
            }, 500, function(){
                Ember.$('body').stop().animate({
                    scrollTop: (Ember.$('.page-header').offset().top-100)
                }, 50);
            });
            }, 100);
       /*Call is send from the getStats() */
   },
    scrollTop(){
        if(this.get('displayStats')){
            Ember.$('.statistics').stop().animate({
               scrollTop: (Ember.$('.container').offset().top-10)
            }, 1000);
        }
        else{
            Ember.$('body').stop().animate({
                scrollTop: (Ember.$('.page-header').offset().top-100)
            }, 1000);
        }
    },
    scrollBot(){
        if(this.get('displayStats')){
            Ember.$('.statistics').stop().animate({
               scrollTop: (Ember.$('.statistics .box:last ol:last li:last').offset().top-100)
            }, 1000);
        }
        else{
            Ember.$('body').stop().animate({
                scrollTop: (Ember.$('.page-footer').offset().top-100)
            }, 1000);
        }
    },
    getStats() {
        this.set('promise', Ember.A());
        let _this = this;
        if(this.get('displayStats')) {
            Ember.$('.statistics').animate({
                height: "0%"
            }, 500, function(){
                _this.set('displayStats', false);
                if(Ember.isPresent(_this.get('scrollPosition')) && Ember.$('body').scrollTop() !== _this.get('scrollPosition')){
                    Ember.$('body').stop().animate({
                        scrollTop: _this.get('scrollPosition')
                    }, 1000);
                }
                Ember.$('body').toggleClass("no-scroll");
            });
        } else {
        this.set('statsInfoLoader', true);   
        let store = this.get('store');
        let posts = store.peekAll('post');
        let comments = store.peekAll('comment');
        let numOfReqs = 0;
            this.set('totalNum', comments.content.length);  
            posts.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            this.set('totalNum', this.get('totalNum')+post.get('commentsNum')-currentLength);
                            
                            _this.get('promise').addObject(
                                delay(150*numOfReqs).then(function() {
                            //Ember.run.later(function(){
                                _this.get('promise').addObject(store.query('comment', {owner_id: '-164278', post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'}).then(
                                    function(resolved){resolved.forEach(comment =>{
                                        _this.set('loadingState', _this.get('loadingState')+1);
                                        comment.set('post', post);
                                    });
                                }));
                            //}, Math.ceil(Math.random()*5000));
                            }));
                            numOfReqs += 1;
                        }    
                    }
                });
        if(Ember.isPresent(posts) && posts.content.length < this.get('statsAmmount')) {
            this.store.adapterFor('post').set('namespace', "method/wall.get");
            posts = this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: this.get('statsAmmount')-posts.content.length, offset: posts.content.length, v: '5.7'});
            this.set('loadedPortion', this.get('statsAmmount'));
            this.set('posts', posts);
            posts.then(function(resolved){
                resolved.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            _this.set('totalNum', _this.get('totalNum')+post.get('commentsNum')-currentLength);
                                _this.get('promise').addObject(
                                delay(150*numOfReqs).then(function() {
                                //Ember.run.later(function(){
                                _this.get('promise').addObject(store.query('comment', {owner_id: '-164278', post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'}).then(
                                    function(resolved){resolved.forEach(comment =>{
                                        _this.set('loadingState', _this.get('loadingState')+1);
                                        comment.set('post', post);
                                    });
                                }));
                               // }, Math.ceil(Math.random()*5000));
                               }));
                               numOfReqs += 1;
                        }                      
                    }
                }); 
           }).finally(function(){
               delay(150*numOfReqs).then(function() {
                 Ember.RSVP.all(_this.get('promise')).then(function(){
            _this.send('computeAllThisShit');
        });        
        });
        });
    }
    else {
        delay(150*numOfReqs).then(function() {
        Ember.RSVP.all(_this.get('promise')).then(function(){
            _this.send('computeAllThisShit');
        });
        });
    }

        }
    }
  }
});
