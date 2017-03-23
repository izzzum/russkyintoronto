import DS from 'ember-data';

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
  user: DS.belongsTo('user')
});
