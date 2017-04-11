import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  ownerId: DS.attr('number'),
  photo130: DS.attr('string'),
  photo604: DS.attr('string'), 
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user'),
  large: Ember.computed('photo604', function(){
    return this.get('photo604');
  })
});
