import DS from 'ember-data';

export default DS.Model.extend({
  ownerId: DS.attr('number'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  duration: DS.attr('number'),
  photo130: DS.attr('string'),
  photo320: DS.attr('string'),
  photo640: DS.attr('string'),
  photo800: DS.attr('string'),
  date: DS.attr('number'),
  addingDate: DS.attr('number'),
  comments: DS.attr('number'),
  player: DS.attr('string'),
  platform: DS.attr('string'),
  accessKey: DS.attr('string'),
  processing: DS.attr('number'),
  live: DS.attr('number'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user'),
  youtube: DS.belongsTo('youtube', {async: true})
});
