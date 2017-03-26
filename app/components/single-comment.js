import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['comment'],
    comment: null,
    isLikes: Ember.computed('comment', function(){
        return (this.get('comment').get('likes') !== '0');
    }),
    actions: {
        jumpTo(anchor){
            Ember.$('body').stop().animate({
            scrollTop: (Ember.$('#'+anchor).offset().top) //need to fix on mobile
            }, 1000);
            }
    }
});
