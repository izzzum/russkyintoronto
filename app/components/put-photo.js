import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['photo-attachment'],
    classNameBindings: ['single'],
    single: Ember.computed(function(){
        return this.get('length') === 1;
    }),
    url: Ember.computed('isLarge', function(){
        return this.get('isLarge') ? this.get('photo.large') : this.get('photo.photo604');
    }),
    imgClass: Ember.computed('isLarge', function(){
        let baseStyle = 'photo-responsive';
        let fullScrStyle = 'img-fullscreen';
        return this.get('isLarge') ? `${baseStyle} ${fullScrStyle}` : baseStyle;
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
