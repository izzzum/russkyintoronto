import DS from 'ember-data';

export default DS.Model.extend({
  ownerId: DS.attr('number'),
  photo130: DS.attr('string'),
  photo604: DS.attr('string'), 
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
