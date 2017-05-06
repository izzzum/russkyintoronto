import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['photo-attachment'],
    classNameBindings: ['single'],
    single: Ember.computed(function(){
        return this.get('length') === 1;
    }),
    imgClass: Ember.computed('isLarge', function(){
        let baseStyle = 'photo-responsive';
        let fullScrStyle = 'img-fullscreen';
        return this.get('isLarge') ? `${baseStyle} ${fullScrStyle}` : baseStyle;
    }),
    toggleOverlay: Ember.computed('isLarge', function(){
        if(this.get('isLarge')){
            Ember.$('.overlay').addClass("hide");
            Ember.$('body').removeClass("no-scroll");
            Ember.$('.liquid-child').removeClass("liquid-fix");
        }
        else{
            Ember.$('.overlay').removeClass("hide");
            Ember.$('body').addClass("no-scroll");
            Ember.$('.liquid-child').addClass("liquid-fix");
        }
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
            this.get('toggleOverlay');
            this.toggleProperty('isLarge');
        },
        next() {
            this.send('toggleImageSize');
            Ember.$('#'+this.elementId).next().find('a.img-resize').click();

        },
        previous() {
            this.send('toggleImageSize');
            Ember.$('#'+this.elementId).prev().find('a.img-resize').click();
        },
    }
});
