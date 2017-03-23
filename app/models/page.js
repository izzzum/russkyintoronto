import DS from 'ember-data';

export default DS.Model.extend({
  groupId: DS.attr('number'),
  title: DS.attr('string'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
