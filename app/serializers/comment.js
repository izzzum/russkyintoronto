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
       //let comments = [];
       ret['attachments'] = [];
       payload.response.comments = payload.response.items;
       delete payload.response.items;
       payload.response.comments.forEach(function(comment){
           //comments.push(comment.id);
           let attachments = [];
           comment.likes = comment.likes.count;
           comment.user = comment.from_id;
           delete comment.from_id;
           delete comment.likes.count;
            if(!Ember.isEmpty(comment.attachments)){
            comment.attachments.forEach(function(attachment){
                //if(Ember.isEmpty(ret.attachments)){
                attachment.id = Math.ceil(Math.random()*100000000); //pizdec
                if(Ember.isEmpty(ret[attachment.type])){
                    ret[attachment.type] = [];
                }
                   // }
               // else {
                //    attachment.id = ret.attachments.lenght; 
               // }
                if(Ember.isEmpty(attachment[attachment.type].id)){
                    attachment[attachment.type].id = Math.ceil(Math.random()*100000000); //pizdec
                }
                attachment[attachment.type].user = attachment[attachment.type].user_id || attachment[attachment.type].owner_id;
                attachment[attachment.type].attachment = attachment.id;
                ret[attachment.type].push(attachment[attachment.type]);
                delete attachment[attachment.type];
                attachment.comment = comment.id;
                //attachments.push(attachment.id);
                //console.log(attachments);
                ret.attachments.push(attachment);
                //console.log(ret);
            });
            delete  comment.attachments;
            //comment.attachments = attachments.toString();
            //console.log(comment.attachments);
           }
        });
        ret[pluralTypeKey] = payload.response.comments;
        ret['users'] = payload.response.profiles;
       // ret['posts'] = {id: 185094, comments: comments};
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},
keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});
