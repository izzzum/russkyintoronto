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
           if(post.from_id > 0) {
                post.user = post.from_id;
           }
           else {
               post.group = post.from_id*(-1);
           }
           delete post.from_id;
           delete post.comments;
           delete post.reposts.count;
           delete post.likes.count;
            post.comments = [];
           if(Ember.isPresent(post.attachments)){
            post.attachments.forEach(function(attachment){
                attachment.id = Math.ceil(Math.random()*100000000);
                if(Ember.isEmpty(ret[attachment.type])){
                    ret[attachment.type] = [];
                }
                if(Ember.isEmpty(attachment[attachment.type].id)){
                    attachment[attachment.type].id = Math.ceil(Math.random()*100000000);
                }
                if(attachment.type === 'poll'){
                    if(attachment[attachment.type].owner_id > 0) {
                        attachment[attachment.type].user = attachment[attachment.type].owner_id;
                    }
                    else {
                        attachment[attachment.type].group = attachment[attachment.type].owner_id*(-1);
                    }
                    if(Ember.isEmpty(ret['answers'])){
                        ret['answers'] = [];
                    }
                    attachment[attachment.type].answers.forEach(function(answer){
                        answer['poll'] = attachment[attachment.type].id;
                        ret.answers.push(answer);
                    });
                    delete attachment[attachment.type].answers;
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
           /*temp solution for reposts*/
            if(Ember.isPresent(post.copy_history)){
                ret['repost'] = {};
                let repost = post.copy_history[0];
                ret.repost.id = repost.id;
                ret.repost.date = repost.date;
                if(post.from_id > 0) {
                    ret.repost.user = repost.from_id;
                }
                else {
                    ret.repost.group = repost.from_id*(-1);
                }
                ret.repost.post = post.id;
                ret.repost.text = repost.text;
                ret.repost.post_type = repost.post_type;
                /*repost attachments*/
                if(Ember.isPresent(repost.attachments)){
                repost.attachments.forEach(function(attachment){
                    attachment.id = Math.ceil(Math.random()*100000000);
                    if(Ember.isEmpty(ret[attachment.type])){
                        ret[attachment.type] = [];
                    }
                    if(Ember.isEmpty(attachment[attachment.type].id)){
                        attachment[attachment.type].id = Math.ceil(Math.random()*100000000);
                    }
                    if(attachment.type === 'poll'){
                        if(attachment[attachment.type].owner_id > 0) {
                            attachment[attachment.type].user = attachment[attachment.type].owner_id;
                        }
                        else {
                            attachment[attachment.type].group = attachment[attachment.type].owner_id*(-1);
                        }
                        if(Ember.isEmpty(ret['answers'])){
                            ret['answers'] = [];
                        }
                        attachment[attachment.type].answers.forEach(function(answer){
                            answer['poll'] = attachment[attachment.type].id;
                            ret.answers.push(answer);
                        });
                        delete attachment[attachment.type].answers;
                    }
                    attachment[attachment.type].user = attachment[attachment.type].user_id || attachment[attachment.type].owner_id;
                    attachment[attachment.type].attachment = attachment.id;
                    ret[attachment.type].push(attachment[attachment.type]);
                    delete attachment[attachment.type];
                    attachment.repost = repost.id;
                    ret.attachments.push(attachment);
                });
            }
                /*end of repost attachments handler*/
            }
            /*end of repost handler*/
        });
        ret[pluralTypeKey] = payload.response.posts;
        ret['user'] = payload.response.profiles;
        if(Ember.isPresent(payload.response.groups)){
            ret['group'] = payload.response.groups;
        }
        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},
keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});
