import Ember from 'ember';
import delay from 'ember-delay/delay';
/*jshint loopfunc: true */
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
        let checkAll = false;
        let loadedPortion = 0;
        this.set('promise', Ember.A());
        let store = this.get('store');
        let posts = store.peekAll('post');
        let numOfReqs = 0;
            this.controllerFor('stats.index').set('totalNum',  0);
            this.controllerFor('stats.index').set('loadingState',  0);
            loadedPortion = posts.content.length;
        let amount = _this.controllerFor('stats.index').get('statsAmount');
        if(loadedPortion < amount && amount-loadedPortion > 100) {
            checkAll = true;
            this.controllerFor('stats.index').set('statsInfoLoader', true);
            this.store.adapterFor('post').set('namespace', "method/wall.get");
            let needAmount = amount-loadedPortion;
            let requests = parseInt(needAmount/100);
            for(let i = 0; i<requests; i++){
                 _this.get('promise').addObject(
                    delay(150*numOfReqs).then(function() {
                        _this.get('promise').addObject(
                _this.store.query('post', {domain: _this.get('settings').name, filter:'all', extended:1, fields: 'profiles', count: 100, offset: (i*100)+loadedPortion, v: '5.7'})
                );
            }));
                numOfReqs += 1;
            }
        }
        if(loadedPortion < _this.controllerFor('stats.index').get('statsAmount') || checkAll) {
            delay(150*numOfReqs).then(function() {
                _this.controllerFor('stats.index').set('statsInfoLoader', true);
                _this.store.adapterFor('post').set('namespace', "method/wall.get");
                if(checkAll){
                    loadedPortion = loadedPortion+(100*numOfReqs);
                }
                posts = _this.store.query('post', {domain: _this.get('settings').name, filter:'all', extended:1, fields: 'profiles', count: _this.controllerFor('stats.index').get('statsAmount')-loadedPortion, offset: loadedPortion, v: '5.7'});
                posts.then(function(resolved){
                    let allPosts = checkAll ? _this.store.peekAll('post') : resolved;
                    allPosts.forEach(post => {
                        if(post.get('commentsNum') !== 0){
                            let currentLength = post.get('comments').content.currentState.length;
                            if(currentLength < post.get('commentsNum')){
                                _this.controllerFor('stats.index').set('totalNum', _this.controllerFor('stats.index').get('totalNum')+post.get('commentsNum')-currentLength);
                                    _this.get('promise').addObject(
                                    delay(150*numOfReqs).then(function() {
                                    _this.get('promise').addObject(store.query('comment', {owner_id: _this.get('settings').groupId, post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'}).then(
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
                });
                posts.finally(function(){
                        delay(150*numOfReqs).then(function() {
                            Ember.RSVP.all(_this.get('promise')).then(function(){
                                _this.send('getStats');
                            });        
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
                if(parseInt(post.get('commentsNum')) !== 0){
                    listOfTopCommented.push({post: post, items: post.get('commentsNum')});
                }
            });
        postsNum = posts.content.length;

        let comments = store.peekAll('comment');
            comments.forEach(comment =>{
                if(parseInt(comment.get('likes')) !== 0){
                    listOfMostLikedComments.push({comment: comment, items: comment.get('likes')});
                }
            });
        commentsNum = comments.content.length;
            
        let users = store.peekAll('user');
            users.forEach(user =>{
                if(parseInt(user.get('leftComments')) !== 0){
                    listOfComments.push({user: user, items: user.get('leftComments')});
                }
                if(parseInt(user.get('leftPosts')) !== 0){
                    listOfPosts.push({user: user, items: user.get('leftPosts')});
                }
                if(parseInt(user.get('likes')) !== 0){
                    listOfOverallLikes.push({user: user, items: user.get('likes')});
                    likesNum += parseInt(user.get('likes'));
                }
            });
        userNum = users.content.length;
            let fulllist = {};
            listOfComments.sort(sortByNumber);
            fulllist.listOfComments = listOfComments;
            listOfComments = listOfComments.slice(0,5);
            listOfPosts.sort(sortByNumber);
            fulllist.listOfPosts = listOfPosts;
            listOfPosts = listOfPosts.slice(0,3);
            listOfTopCommented.sort(sortByNumber);
            fulllist.listOfTopCommented = listOfTopCommented;
            listOfTopCommented = listOfTopCommented.slice(0,3);
            listOfMostLikedComments.sort(sortByNumber);
            fulllist.listOfMostLikedComments = listOfMostLikedComments;
            listOfMostLikedComments = listOfMostLikedComments.slice(0,3);
            listOfOverallLikes.sort(sortByNumber);
            fulllist.listOfOverallLikes = listOfOverallLikes;
            listOfOverallLikes = listOfOverallLikes.slice(0,5);

            let totalvalues = {};
            totalvalues.posts = postsNum;
            totalvalues.comments = commentsNum;
            totalvalues.users = userNum;
            totalvalues.likes = likesNum;

            this.set('list.totalvalues', totalvalues);
            this.set('list.topCommentsUsers', listOfComments);
            this.set('list.topPostsUsers', listOfPosts);
            this.set('list.topCommentedPosts', listOfTopCommented);
            this.set('list.mostLikedComments', listOfMostLikedComments);
            this.set('list.listOfOverallLikes', listOfOverallLikes);
            this.controllerFor('stats.index').set('list', this.get('list'));

            this.controllerFor('stats.comments').set('comments', fulllist.listOfComments);
            this.controllerFor('stats.comments').set('list', totalvalues);

            this.controllerFor('stats.likes').set('likes', fulllist.listOfOverallLikes);
            this.controllerFor('stats.likes').set('list', totalvalues);

            this.controllerFor('stats.posts').set('posts', fulllist.listOfPosts);
            this.controllerFor('stats.posts').set('list', totalvalues);

            this.controllerFor('stats.topPosts').set('topPosts', fulllist.listOfTopCommented);
            this.controllerFor('stats.topPosts').set('list', totalvalues);

            this.controllerFor('stats.topComments').set('topComments', fulllist.listOfMostLikedComments);
            this.controllerFor('stats.topComments').set('list', totalvalues);

            this.controllerFor('stats.index').set('statsInfoLoader', false);
            Ember.$('button.loadMore').attr('disabled', null);

        },
        sessionChanged(){
            this.refresh();
        }
    }
});
