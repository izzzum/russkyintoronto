import Ember from 'ember';

export default Ember.Component.extend({
    simple: false,
    classNames: ['comment'],
    attributeBindings: ['id'],
    id: Ember.computed(function(){
        if(this.get('simple') === false){
            return `comment${this.get('comment').id}`;
        }
    }),
    comment: null,
    isLikes: Ember.computed('comment', function(){
        return (this.get('comment').get('likes') !== '0');
    }),
    actions: {
        jumpTo(anchor){
            Ember.$('body').stop().animate({
            scrollTop: (Ember.$('#comment'+anchor).offset().top -39) //-size of the top menu
            }, 1000);
        }
    }
});
