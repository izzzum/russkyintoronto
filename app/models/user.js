import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  sex: DS.attr('string'),
  screenName: DS.attr('string'),
  photo50: DS.attr('string'),
  photo100: DS.attr('string'),
  online: DS.attr('string'),
  posts: DS.hasMany('post', {async: true}),
  comments: DS.hasMany('comment', {async: true, inverse: 'user'}),
  totalLikes: DS.attr('number', {defaultValue: 0})
});
