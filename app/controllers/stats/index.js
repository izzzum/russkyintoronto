import Ember from 'ember';

export default Ember.Controller.extend({
    back: true,
    totalNum: 0,
    loadingState: 0,
    statsInfoLoader: false,
    maxStatsValue: Ember.computed(function() {
        return this.get('settings').maxStatsValue;
    }),
    statsAmount: Ember.computed(function() {
        return this.get('settings').defaultStatsAmount;
   }),
    amount: Ember.computed(function() {
        return this.get('settings').defaultStatsButtonVal;
    }),
    previous: Ember.computed(function() {
        return this.get('settings').defaultStatsButtonVal;
    }),
    actions: {
        changeAmount(amount) {
            amount = amount > this.get('maxStatsValue') ? this.get('maxStatsValue') : amount;
            Ember.$('button.loadMore').attr('disabled', 'disabled');
            this.set('statsAmount', this.get('statsAmount') + parseInt(amount));
            this.send("sessionChanged");
        },
        updateValue(value){
            this.set('previous',value);
        },
        validateInput(value){
            if(value !== this.get('previous')){
                if(isNaN(Ember.$('input').val()) || Ember.$('input').val() === ''){
                    Ember.$('button.loadMore').attr('disabled', 'disabled');
                }
                else if(Ember.$('input').val()<1001){
                    Ember.$('input').val(parseInt(this.amount.toString().slice(0, 4)));
                    this.set('amount', Ember.$('input').val());
                    Ember.$('button.loadMore').attr('disabled', null);
                }
                else{
                    this.set('amount', this.get('maxStatsValue'));
                    Ember.$('input').val(this.get('maxStatsValue'));
                    Ember.$('button.loadMore').attr('disabled', null);
                }
            }
        },
        focus(){
            Ember.$('body').stop().animate({
                    scrollTop: (Ember.$('input').offset().top -150) //-size of the top menu
                }, 1000);
        }
    }
});
