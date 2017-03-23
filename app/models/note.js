import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('number'),
  title: DS.attr('string'),
  text: DS.attr('string'),
  date: DS.attr('number'),
  comments: DS.attr('number'),
  readComments: DS.attr('number'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
