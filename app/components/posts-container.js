import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['container'],
    attributeBindings: ['id'],
    id: 'content',
    store: Ember.inject.service(),
    isLoadingNow: false,
    count: null,
    loadedPortion: null,
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
            if(this.get('isLoadingNow') === false) {
                this.set('isLoadingNow', true);
                this.send('loadMore');
            }
        }
    },
    willDestroyElement: function() {
        Ember.$(window).unbind("scroll");
    },
    actions:{
        loadMore: function() {
            return Ember.RSVP.hash({
                posts: this.get('store').query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: this.get('count'), offset: this.get('loadedPortion'), v: '5.7'}).then(resolved => {
                    let loadedPortion = this.get('loadedPortion') + this.get('count');
                    this.set('loadedPortion', loadedPortion);
                    this.set('posts', this.get('store').peekAll('post'));
                    this.set('isLoadingNow', false);
                }),
            });
        }
    }
});
