import DS from 'ember-data';

export default DS.Model.extend({
  ownerId: DS.attr('number'),
  created: DS.attr('number'),
  question: DS.attr('string'),
  votes: DS.attr('number'),
  answerId: DS.attr('number'),
  answers: DS.hasMany('answer'),
  anonymous: DS.attr('number'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
