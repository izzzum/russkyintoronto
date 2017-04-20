import DS from 'ember-data';

export default DS.RESTSerializer.extend({
normalizeSingleResponse(store, primaryModelClass, payload, id, requestType){
let typeKey = primaryModelClass.modelName;
        let ret = {};
        ret[typeKey] = {};
        ret[typeKey].id = payload.items[0].id.videoId;
        ret[typeKey].title = payload.items[0].snippet.title;
        ret[typeKey].thumbnail = payload.items[0].snippet.thumbnails.high.url;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, true);
}
});
