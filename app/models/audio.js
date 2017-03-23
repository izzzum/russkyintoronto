import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  ownerId: DS.attr('number'),
  artist: DS.attr('string'),
  title: DS.attr('string'),
  duration: DS.attr('number'),
  lyricsId: DS.attr('number'),
  albumId:  DS.attr('number'),
  genreId: DS.attr('number'),
  date: DS.attr('number'),
  noSearch: DS.attr('number'),
  attachment: DS.belongsTo('attachment'),
  user: DS.belongsTo('user')
});
