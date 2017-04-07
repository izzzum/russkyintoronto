import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['loading-stats'],
    notEqual: Ember.computed('state', function(){
        return (this.get('state') !== this.get('total'));
    })
});
