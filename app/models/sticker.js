import DS from 'ember-data';

export default DS.Model.extend({
  productId: DS.attr('number'),
  photo64: DS.attr('string'),
  photo128: DS.attr('string'),
  photo256: DS.attr('string'),
  photo352: DS.attr('string'),
  width: DS.attr('number'),
  height: DS.attr('number'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
