import Ember from 'ember';

export default Ember.Controller.extend({
    back: true,
    renderButton: Ember.computed('model', 'loaded', function(){
        if(Ember.isEmpty(this.get('list')) || this.get('list').users === 0){
            return false;
        }
        if(this.get('loaded') >= this.get('model').length){
            return false;
        }
        return true;
    }),
    portion: Ember.computed('loaded', 'model', function(){
        if(this.get('renderButton')){
            return this.get('model').slice(0,this.get('loaded'));
        }
        else {
            return this.get('model');
        }
    }),
    portionNumber: Ember.computed('loaded', function(){
        let num = 20;
        if(this.get('loaded')+num > this.get('model').length){
            return this.get('model').length-this.get('loaded');
        }else{
            return num;
        }
    }),
    loaded: 20,
    actions: {
        loadMore() {
            this.set('loaded', this.get('loaded')+20);
        }
    }
});
