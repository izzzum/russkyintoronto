import Ember from 'ember';

export default Ember.Controller.extend({
    back: true,
    totalNum: 0,
    loadingState: 0,
    statsInfoLoader: false,
    statsAmount: 50,
    amount: 100,
    previous: 100,
    actions: {
        changeAmount(amount) {
            amount = amount > 1000 ? 1000 : amount;
            Ember.$('button.loadMore').attr('disabled', 'disabled');
            this.set('statsAmount', this.get('statsAmount') + parseInt(amount));
            this.send("sessionChanged");
        },
        updateValue(value){
            this.set('previous',value)
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
                    this.set('amount', 1000);
                    Ember.$('input').val(1000);
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
