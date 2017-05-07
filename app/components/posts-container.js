import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['container'],
    attributeBindings: ['id'],
    id: 'content',
    store: Ember.inject.service(),
    isLoadingNow: false,
    disablePostLoading: false,
    didInsertElement: function() {
        let view = this;
        Ember.$(window).bind("scroll", function(){
            view.didScroll();
        });
    },
    isThereMore: Ember.computed('isLoadingNow', function(){
       return this.get('isLoadingNow');
    }),
    didScroll: function() {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        st += Ember.$(window).height();
        if(st >= Ember.$('body').outerHeight(true))   //user scrolled to bottom of the page?
        {
            if(this.get('isLoadingNow') === false && this.get('disablePostLoading') === false) {
                this.set('isLoadingNow', true);
                this.send('loadMore');
            }
        }
    },
    willDestroyElement: function() {
        Ember.$(window).unbind("scroll");
        Ember.RSVP.resolve(this.get('promise'));
    },
    actions:{
        loadMore: function() {
            let _this = this;
            let posts = this.get('store').peekAll('post');
            let loadedPortion = posts.content.length === 1 ? 0 : posts.content.length;
                _this.get('store').query('post', {
                domain: this.get('settings').name, 
                filter:'all', 
                extended:1, 
                fields: 'profiles', 
                count: _this.get('settings').postLoadAmount, 
                offset: loadedPortion, 
                v: '5.7'}).then(function() {
                    _this.set('posts', _this.get('store').peekAll('post'));
                    _this.set('isLoadingNow', false);
                });
        }
    }
});
