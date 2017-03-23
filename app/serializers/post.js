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
        /*payload.response.posts.likes = payload.response.posts.likes.count;
        payload.response.posts.comments = payload.response.posts.comments.count;
        payload.response.posts.reposts = payload.response.posts.likes.reposts;*/
       ret['attachments'] = [];
       payload.response.posts = payload.response.items;
       delete payload.response.items;
       payload.response.posts.forEach(function(post){
           let attachments = [];
           post.likes = post.likes.count;
           post.reposts = post.reposts.count;
           post.comments = post.comments.count;
           post.user = post.from_id;
           delete post.from_id;
           delete post.comments.count;
           delete post.reposts.count;
           delete post.likes.count;
           if(!Ember.isEmpty(post.attachments)){
            post.attachments.forEach(function(attachment){
                if(Ember.isEmpty(ret.attachments)){
                        attachment.id = 0;
                    }
                else {
                    attachment.id = ret.attachments.lenght; 
                }
                attachment[attachment.type].user = attachment[attachment.type].user_id;
                attachment[attachment.type].attachment = attachment.id;
                ret[attachment.type] = attachment[attachment.type];
                delete attachment[attachment.type];
                attachment.post = post.id;
                attachments.push(attachment.id);
                ret.attachments.push(attachment);
            });
            delete  post.attachments;
            post.attachments = attachments.toString();
           }
        });
       ret[pluralTypeKey] = payload.response.posts;
         /*ret[pluralTypeKey] = {
      likes: payload.response.posts.likes['count'],
      comments: payload.response.posts.comments['count'],
      reposts: payload.response.posts.reposts['count']
    };*/
        ret['user'] = payload.response.profiles;
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},
keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});