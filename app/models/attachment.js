import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  post: DS.belongsTo('post'),
  comment: DS.belongsTo('comment'),
  photo: DS.belongsTo('photo'),
  postedPhoto: DS.belongsTo('posted-photo'),
  video: DS.belongsTo('video'),
  audio: DS.belongsTo('audio'),
  doc: DS.belongsTo('doc'),
  graffiti: DS.belongsTo('graffiti'),//obsolete
  link: DS.belongsTo('link'),
  note: DS.belongsTo('note'),
  app: DS.belongsTo('app'),
  poll: DS.belongsTo('poll'),
  page: DS.belongsTo('page'),
  sticker: DS.belongsTo('sticker')
});
