import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['photo-attachment'],
    classNameBindings: ['single'],
    single: Ember.computed(function(){
        return this.get('length') === 1;
    }),
    
    isLarge: false,
    ifNext: Ember.computed(function(){
        return Ember.$('#'+this.elementId).next().find('a.img-resize').length === 1;
    }),
    ifPrev: Ember.computed(function(){
        return Ember.$('#'+this.elementId).prev().find('a.img-resize').length === 1;
    }),
    actions: {
        toggleImageSize() {
            this.toggleProperty('isLarge');
            Ember.$('.overlay').toggleClass("hide");
            Ember.$('body').toggleClass("no-scroll");
            Ember.$('.liquid-child').toggleClass("liquid-fix");
        },
        next() {
            this.toggleProperty('isLarge');
            Ember.$('.overlay').toggleClass("hide");
            Ember.$('body').toggleClass("no-scroll");
            Ember.$('.liquid-child').toggleClass("liquid-fix");
            Ember.$('#'+this.elementId).next().find('a.img-resize').click();

        },
        previous() {
            this.toggleProperty('isLarge');
            Ember.$('.overlay').toggleClass("hide");
            Ember.$('body').toggleClass("no-scroll");
            Ember.$('.liquid-child').toggleClass("liquid-fix");
            Ember.$('#'+this.elementId).prev().find('a.img-resize').click();
        },
    }
});
