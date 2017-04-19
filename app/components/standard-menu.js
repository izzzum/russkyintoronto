import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['menu'],
    tagName: 'nav',
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
        back(){
            history.back();
        }
    }
});
