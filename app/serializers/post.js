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
       payload.response.posts = payload.response.items;
       delete payload.response.items;
       payload.response.posts.forEach(function(post){
           post.likes = post.likes.count;
           post.reposts = post.reposts.count;
           post['comments_num'] = post.comments.count;
           post.user = post.from_id;
           delete post.from_id;
           delete post.comments;
           delete post.reposts.count;
           delete post.likes.count;
            post.comments = [];
           if(!Ember.isEmpty(post.attachments)){
            post.attachments.forEach(function(attachment){
                attachment.id = Math.ceil(Math.random()*100000000);
                if(Ember.isEmpty(ret[attachment.type])){
                    ret[attachment.type] = [];
                }
                if(Ember.isEmpty(attachment[attachment.type].id)){
                    attachment[attachment.type].id = Math.ceil(Math.random()*100000000);
                }
                attachment[attachment.type].user = attachment[attachment.type].user_id || attachment[attachment.type].owner_id;
                attachment[attachment.type].attachment = attachment.id;
                ret[attachment.type].push(attachment[attachment.type]);
                delete attachment[attachment.type];
                attachment.post = post.id;
                ret.attachments.push(attachment);
            });
            delete  post.attachments;
           }
        });
        ret[pluralTypeKey] = payload.response.posts;
        ret['user'] = payload.response.profiles;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},
keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});
