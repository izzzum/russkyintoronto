import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('number'),
  postType: DS.attr('string'),
  text: DS.attr('string'),
  attachments: DS.hasMany('attachment', {async: true}),
  user: DS.belongsTo('user', {async: true}),
  group: DS.belongsTo('group'),
  post: DS.belongsTo('post')
});
