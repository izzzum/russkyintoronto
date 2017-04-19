import Ember from 'ember';

export default Ember.Component.extend({
    images: function(){
        if(doc.type === 4 || doc.type === 3){
            return true;
        }
        else{
            return false;
        }
    }
});
