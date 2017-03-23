import DS from 'ember-data';

export default DS.Model.extend({
  ownerId: DS.attr('number'),
  title: DS.attr('string'),
  size: DS.attr('number'),
  ext: DS.attr('string'),
  url: DS.attr('string'),
  date: DS.attr('number'),
  type: DS.attr('string'),
  preview: DS.belongsTo('preview'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
