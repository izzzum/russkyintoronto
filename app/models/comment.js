import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  replied: DS.belongsTo('user'),
  date: DS.attr('string'),
  text: DS.attr('string'),
  likes: DS.attr('string'),
  post: DS.belongsTo('post'),
  replyToUser: DS.attr('number'),
  replyToComment: DS.attr('number'),
  attachments: DS.hasMany('attachment'),
  commentsNum: DS.attr('number'),
  group: DS.belongsTo('group')
});
