import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['photo-attachment'],
    isLarge: false,
    actions: {
        toggleImageSize() {
            this.toggleProperty('isLarge');
            Ember.$('.overlay').toggleClass("hide");
        }
    }
});
