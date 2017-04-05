import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['percent-bar'],
    didInsertElement: function(){
        let realThis = this;
        let el = "#"+realThis.elementId+" .overlay-rate";
        Ember.run.later(function(){
            Ember.$(el).animate({
                    left: realThis.get('rate')+"%"
                }, 1000);
        }, 1200);
    }
});
