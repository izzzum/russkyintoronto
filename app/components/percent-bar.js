import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['progress'],
    delay: 1200,
    didInsertElement: function(){
        if(this.get('delay') !== 0){
            let _this = this;
            let el = `#${_this.elementId} .progress-bar`;
            Ember.run.later(function(){
                Ember.$(el).css({
                        width: `${_this.get('rate')}%`
                    }, 1000);
            }, _this.get('delay'));
        }
    }
});
