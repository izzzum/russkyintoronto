import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['percent-bar'],
    delay: 1200,
    didInsertElement: function(){
        if(this.get('delay') !== 0){
            let realThis = this;
            let el = "#"+realThis.elementId+" .overlay-rate";
            Ember.run.later(function(){
                Ember.$(el).animate({
                        left: realThis.get('rate')+"%"
                    }, 1000);
            }, realThis.get('delay'));
        }
    }
});
