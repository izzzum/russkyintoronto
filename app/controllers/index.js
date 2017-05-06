import Ember from 'ember';
import delay from 'ember-delay/delay';

export default Ember.Controller.extend({
   list: {},
   sortByNumber: function(a, b) {
        return ((parseInt(a.items) > parseInt(b.items)) ? -1 : ((parseInt(a.items) === parseInt(b.items)) ? 0 : 1));
    },
   back: false,
   index: true,
   promise: null,
   totalNum: 0,
   loadingState: 0,
   scrollPosition: null,
   store: Ember.inject.service(),
   statsAmount: Ember.computed(function() {
        return this.get('settings').defaultStatsAmount;
   }),
   disablePostLoading: Ember.computed('statsInfoLoader', function(){
       if(this.get('statsInfoLoader') === true){
           return true;
       }
       else{
           return false;
       }
   }),
   statsInfoLoader: false,
   showLoader: Ember.computed(function() {
        return this.get('model.posts') ? false: true;
    }),
    actions: {
    getStats() {
        let loadedPortion = 0;
        this.set('promise', Ember.A());
        let _this = this;
        this.set('statsInfoLoader', true);
        this.set('totalNum', 0);
        this.set('loadingState', 0);   
        let store = this.get('store');
        let posts = store.peekAll('post');
        let numOfReqs = 0;
            loadedPortion = posts.content.length;
            posts.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            this.set('totalNum', this.get('totalNum')+post.get('commentsNum')-currentLength);
                            _this.get('promise').addObject(
                                delay(150*numOfReqs).then(function() {
                                _this.get('promise').addObject(store.query('comment',
                                {owner_id: _this.get('settings').groupId, post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'})
                                .then(
                                    function(resolved){resolved.forEach(comment =>{
                                        _this.set('loadingState', _this.get('loadingState')+1);
                                        comment.set('post', post);
                                    });
                                }));
                            }));
                            numOfReqs += 1;
                        }    
                    }
                });
        if(Ember.isPresent(posts) && loadedPortion < this.get('statsAmount')) {
            this.store.adapterFor('post').set('namespace', "method/wall.get");
            posts = this.store.query('post', {domain: this.get('settings').name, filter:'all', extended:1, fields: 'profiles', count: this.get('statsAmount')-loadedPortion, offset: loadedPortion, v: '5.7'});
            this.set('posts', posts);
            posts.then(function(resolved){
                resolved.forEach(post => {
                    if(post.get('commentsNum') !== 0){
                        let currentLength = post.get('comments').content.currentState.length;
                        if(currentLength < post.get('commentsNum')){
                            _this.set('totalNum', _this.get('totalNum')+post.get('commentsNum')-currentLength);
                                _this.get('promise').addObject(
                                delay(150*numOfReqs).then(function() {
                                _this.get('promise').addObject(store.query('comment', {owner_id: _this.get('settings').groupId, post_id: post.get('id'), extended:1, oauth: 1, count: post.get('commentsNum'), offset: currentLength, need_likes: 1, v: '5.7'}).then(
                                    function(resolved){resolved.forEach(comment =>{
                                        _this.set('loadingState', _this.get('loadingState')+1);
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
                            _this.send('transitionToStats');
                        });        
                    });
                });
            }
            else {
                delay(150*numOfReqs).then(function() {
                    Ember.RSVP.all(_this.get('promise')).then(function(){
                        _this.send('transitionToStats');
                    });
                });
            }
        },
        transitionToStats(){
            let _this = this;
            this.set('statsInfoLoader', false);
            this.set('scrollPosition', Ember.$('body').scrollTop());
            Ember.run.later(function(){
                _this.transitionToRoute('stats');
            }, 100);
        }
  }
});
