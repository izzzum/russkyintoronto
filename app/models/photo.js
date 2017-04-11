import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  albumId: DS.attr('number'),
  ownerId: DS.attr('number'),
  userId: DS.attr('number'),
  photo75: DS.attr('string'),
  photo130: DS.attr('string'),
  photo604: DS.attr('string'),
  photo807: DS.attr('string'),
  photo1280: DS.attr('string'),
  width: DS.attr('number'),
  height: DS.attr('number'),
  text: DS.attr('string'),
  date: DS.attr('number'),
  attachment: DS.belongsTo('attachment'),
  accessKey: DS.attr('string'),
  user: DS.belongsTo('user'),
  large: Ember.computed('photo807', 'photo604', function(){
    if(Ember.isPresent(this.get('photo807'))){
      return this.get('photo807');
    }
    else {
      return this.get('photo604');
    }
  }),
  tall: Ember.computed('width', 'height', function(){
    return this.get('height') > this.get('width');
  }),
});
