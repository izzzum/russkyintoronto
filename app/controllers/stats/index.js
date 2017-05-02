import Ember from 'ember';

export default Ember.Controller.extend({
    back: true,
    totalNum: 0,
    loadingState: 0,
    statsInfoLoader: false,
    statsAmount: 50,
    actions: {
        changeAmount(amount) {
            this.set('statsAmount', this.get('statsAmount') + amount);
            this.send("sessionChanged");
        }
    }
});
