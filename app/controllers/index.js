import Ember from 'ember';

export default Ember.Controller.extend({
   //store: Ember.inject.service(),
   showLoader: Ember.computed(function() {
        return this.get('model.posts') ? false: true;
    }),
    didInsertElement: function() {
        console.log('test');
        let view = this;
        Ember.$(window).bind("scroll", function(){
            view.didScroll();
        });
    },
    didScroll: function() {
        if(this.isScrolledToBottom()){
            this.get('controller').send('more'); //need to edit
        }
    },
    willDestroyElement: function() {
        Ember.$(window).unbind("scroll");
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