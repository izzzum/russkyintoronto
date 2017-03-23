import DS from 'ember-data';

export default DS.Model.extend({
  ownerId: DS.attr('number'),
  date: DS.attr('number'),
  markedAsAds: DS.attr('number'),
  postType: DS.attr('string'),
  text: DS.attr('string'),
  attachments: DS.hasMany('attachment', {async: true}),
  comments: DS.attr('number'),
  likes: DS.attr('string'),
  reposts: DS.attr('string'),
  user: DS.belongsTo('user', {async: true})
});
