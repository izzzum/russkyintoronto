import Ember from 'ember';
import delay from 'ember-delay/delay';

export default Ember.Route.extend({
      renderTemplate(controller, model) {
      this._super(controller, model);
      this.render('generic-nav', {
          into: 'application',
          outlet: 'nav-menu'
      });
      this.render('loader', {
          into: 'application',
          outlet: 'loading'
      });
    },
    list: {},
    promise: null,
    sortByNumber: function(a, b) {
        return ((parseInt(a.items) > parseInt(b.items)) ? -1 : ((parseInt(a.items) === parseInt(b.items)) ? 0 : 1));
    },
    store: Ember.inject.service(),
    model: function() {
        let _this = this;
        let loadedPortion = 0;
        this.set('promise', Ember.A());
        let store = this.get('store');
        let posts = store.peekAll('post');
        let comments = store.peekAll('comment');
        let numOfReqs = 0;
            this.controllerFor('stats.index').set('totalNum',  comments.content.length);
            loadedPortion = posts.content.length;
        if(loadedPortion < _this.controllerFor('stats.index').get('statsAmount')) {
            this.controllerFor('stats.index').set('statsInfoLoader', true);
            this.store.adapterFor('post').set('namespace', "method/wall.get");
            posts = this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: _this.controllerFor('stats.index').get('statsAmount')-loadedPortion, offset: loadedPortion, v: '5.7'});
            posts.then(function(resolved){
                resolved.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            _this.controllerFor('stats.index').set('totalNum', _this.controllerFor('stats.index').get('totalNum')+post.get('commentsNum')-currentLength);
                                _this.get('promise').addObject(
                                delay(150*numOfReqs).then(function() {
                                _this.get('promise').addObject(store.query('comment', {owner_id: '-164278', post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'}).then(
                                    function(resolved){resolved.forEach(comment =>{
                                        _this.controllerFor('stats.index').set('loadingState',  _this.controllerFor('stats.index').get('loadingState')+1);
                                        comment.set('post', post);
                                        });
                                    }));
                                }));
                            numOfReqs += 1;
                        }                      
                    }
                }); 
                }).finally(function(){
                    delay(150*numOfReqs).then(function() {
                        Ember.RSVP.all(_this.get('promise')).then(function(){
                            _this.send('getStats');
                        });        
                    });
                });
            }
            else {
                this.controllerFor('stats.index').set('statsInfoLoader', true);
                delay(150*numOfReqs).then(function() {
                    Ember.RSVP.all(_this.get('promise')).then(function(){
                        _this.send('getStats');
                    });
                });
            }
        },
    actions: {
    getStats() {
        //this.controllerFor('stats.index').set('loadingState',  this.controllerFor('stats').get('totalNum'));
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
            let fulllist = {};
            listOfComments.sort(sortByNumber);
            fulllist.listOfComments = listOfComments;
            listOfComments = listOfComments.slice(0,5);
            listOfPosts.sort(sortByNumber);
            fulllist.listOfPosts = listOfPosts;
            listOfPosts = listOfPosts.slice(0,3);
            if(listOfPosts[2].items === 1){
                listOfPosts = listOfPosts.slice(0,2);
            }
            listOfTopCommented.sort(sortByNumber);
            fulllist.listOfTopCommented = listOfTopCommented;
            listOfTopCommented = listOfTopCommented.slice(0,3);
            listOfMostLikedComments.sort(sortByNumber);
            fulllist.listOfMostLikedComments = listOfMostLikedComments;
            listOfMostLikedComments = listOfMostLikedComments.slice(0,3);
            listOfOverallLikes.sort(sortByNumber);
            fulllist.listOfOverallLikes = listOfOverallLikes;
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
            let totalvalues = {};
            totalvalues.posts = postsNum;
            totalvalues.comments = commentsNum;
            totalvalues.users = userNum;
            totalvalues.likes = likesNum;

            this.controllerFor('stats.index').set('list', this.get('list'));
            this.controllerFor('stats.comments').set('comments', fulllist.listOfComments);
            this.controllerFor('stats.comments').set('list', totalvalues);
            this.controllerFor('stats.index').set('statsInfoLoader', false);

        },
        sessionChanged(){
            this.refresh();
        }
    }
});
