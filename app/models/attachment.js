import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),//attr
  post: DS.belongsTo('post'),//dependency
  photo: DS.belongsTo('photo'),//done
  postedPhoto: DS.belongsTo('posted-photo'),//done
  video: DS.belongsTo('video'),//done
  audio: DS.belongsTo('audio'),//done
  doc: DS.belongsTo('doc'),//done
  graffiti: DS.belongsTo('graffiti'),//obsolete
  link: DS.belongsTo('link'),//done
  note: DS.belongsTo('note'),//done
  app: DS.belongsTo('app'),//done
  poll: DS.belongsTo('poll'),//done
  page: DS.belongsTo('page'),//done
  sticker: DS.belongsTo('sticker')//done
});
