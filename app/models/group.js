import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  screenName: DS.attr('string'),
  isClosed: DS.attr('string'),
  type: DS.attr('string'),
  photo50: DS.attr('string'),
  photo100: DS.attr('string'),
  photo200: DS.attr('string')
});
