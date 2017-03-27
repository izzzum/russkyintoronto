import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
normalizeSingleResponse(store, primaryModelClass, payload, id, requestType){
let typeKey = primaryModelClass.modelName;
        let ret = {};
        ret[typeKey] = payload.response;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, true);
},

normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
 let pluralTypeKey = Ember.Inflector.inflector.pluralize(primaryModelClass.modelName);
       let ret = {};
       ret['attachments'] = [];
       payload.response.comments = payload.response.items;
       delete payload.response.items;
       payload.response.comments.forEach(function(comment){
           //let attachments = [];
           comment.likes = comment.likes.count;
           comment.user = comment.from_id;
          if(!Ember.isEmpty(comment.reply_to_user)){
           comment.replied = comment.reply_to_user;
          }else {
              comment.replied = null;
          }
           delete comment.from_id;
           delete comment.likes.count;
            if(!Ember.isEmpty(comment.attachments)){
            comment.attachments.forEach(function(attachment){
                attachment.id = Math.ceil(Math.random()*100000000); //pizdec
                if(Ember.isEmpty(ret[attachment.type])){
                    ret[attachment.type] = [];
                }
                if(Ember.isEmpty(attachment[attachment.type].id)){
                    attachment[attachment.type].id = Math.ceil(Math.random()*100000000); //pizdec
                }
                attachment[attachment.type].user = attachment[attachment.type].user_id || attachment[attachment.type].owner_id;
                attachment[attachment.type].attachment = attachment.id;
                ret[attachment.type].push(attachment[attachment.type]);
                delete attachment[attachment.type];
                attachment.comment = comment.id;
                ret.attachments.push(attachment);
            });
            delete  comment.attachments;
           }
        });
        ret[pluralTypeKey] = payload.response.comments;
        ret['users'] = payload.response.profiles;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},
keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});
