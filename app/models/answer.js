import DS from 'ember-data';

export default DS.Model.extend({
  rate: DS.attr('string'),
  votes: DS.attr('number'),
  text: DS.attr('string')
});
