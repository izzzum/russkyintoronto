import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['animation_image'],
    attributeBindings: ['align'],
    align: 'center',
    show: null
});
