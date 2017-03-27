import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['loader-img'],
    attributeBindings: ['align'],
    align: 'center',
    show: null
});
