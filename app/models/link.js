import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  caption: DS.attr('string'),
  photo: DS.belongsTo('photo'),
  isExternal: DS.attr('number'),
  previewUrl:  DS.attr('string'),
  target: DS.attr('string'),
  imageSrc: DS.attr('string'),
  imageBig: DS.attr('string'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
