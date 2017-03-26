import Ember from 'ember';

export default Ember.View.extend({
    templateName: 'index',
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
});
