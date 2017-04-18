import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['percent-bar'],
    delay: 1200,
    didInsertElement: function(){
        if(this.get('delay') !== 0){
            let _this = this;
            let el = `#${_this.elementId} .overlay-rate`;
            Ember.run.later(function(){
                Ember.$(el).animate({
                        left: `${_this.get('rate')}%`
                    }, 1000);
            }, _this.get('delay'));
        }
    }
});
