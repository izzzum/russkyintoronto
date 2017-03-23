import DS from 'ember-data';

export default DS.RESTSerializer.extend({
normalizeSingleResponse(store, primaryModelClass, payload, id, requestType){
let typeKey = primaryModelClass.modelName;
        let ret = {};
        ret[typeKey] = payload.response;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, true);
},

/*normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
 let pluralTypeKey = Ember.Inflector.inflector.pluralize(primaryModelClass.modelName);
 let typeKey = primaryModelClass.modelName;
        let ret = {};
        ret[pluralTypeKey] = payload.response;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},*/
  keyForAttribute: function(key) {
const regex = /\D\d/g;
let m;

if ((m = regex.exec(key)) !== null) {
    m.forEach((match, groupIndex) => {
        key = key.slice(0, key.indexOf(match)+1) + "_" + key.slice(key.indexOf(match)+1);
    });
    return key;
}
        else{
    return Ember.String.underscore(key);
        }
  }
});

