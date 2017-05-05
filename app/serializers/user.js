import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
keyForAttribute: function(key) {
const regex = /\D\d/g;
let m;

if ((m = regex.exec(key)) !== null) {
    m.forEach((match) => {
        key = key.slice(0, key.indexOf(match)+1) + "_" + key.slice(key.indexOf(match)+1);
    });
    return key;
}
        else{
    return Ember.String.underscore(key);
        }
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
      let ret = {};
      ret.user = {};
      ret.user.id = payload.response[0].uid;
      ret.user.first_name = payload.response[0].first_name;
      ret.user.last_name = payload.response[0].last_name;
      ret.user.screen_name = payload.response[0].screen_name;
      ret.user.sex = payload.response[0].sex;
      ret.user.online = payload.response[0].online;
      ret.user.photo_50 = payload.response[0].photo_50;
      ret.user.photo_100 = payload.response[0].photo_100;
      return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
  }
});

