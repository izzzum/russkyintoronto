import Ember from 'ember';

export default Ember.Controller.extend({
    back: true,
    renderButton: Ember.computed('model', 'loaded', function(){
        if(Ember.isEmpty(this.get('list')) || this.get('list').users === 0){
            return false;
        }
        if(this.get('loaded') >= this.get('list').users-1){
            return false;
        }
        return true;
    }),
    portion: Ember.computed('loaded', function(){
        if(this.get('renderButton')){
            return this.get('model').slice(0,this.get('loaded'));
        }
        else {
            return this.get('model');
        }
    }),
    loaded: 20,
    actions: {
        loadMore() {
            this.set('loaded', this.get('loaded')+20);
        }
    }
});
