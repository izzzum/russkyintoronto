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
       //ret['comments'] = [];
       payload.response.posts = payload.response.items;
       delete payload.response.items;
       payload.response.posts.forEach(function(post){
            /*if(Ember.isEmpty(post.comment)){
                    post.comment = [];
                }
           let getComments = store.query('comment', {owner_id: '-164278', post_id: post.id, extended:1, oauth: 1, /*count: 4, offset: 1,*/ /*need_likes: 1, v: '5.7'});
           getComments.then(function(model){
               post.comment.push(model.query.post_id);
});*/
           //let attachments = [];
           post.likes = post.likes.count;
           post.reposts = post.reposts.count;
           post['comments_num'] = post.comments.count;
           post.user = post.from_id;
           delete post.from_id;
           delete post.comments;
           delete post.reposts.count;
           delete post.likes.count;
        //    if (Ember.isEmpty(post.commentIds)){
            post.comments = [];
        //    } else {
        //        post.comments = post.commentIds;
        //    }
           /*if(post.id === 185094)
           post.comments.push(1234, 2345);*/
           if(!Ember.isEmpty(post.attachments)){
            post.attachments.forEach(function(attachment){
                //if(Ember.isEmpty(ret.attachments)){
                attachment.id = Math.ceil(Math.random()*100000000);
                if(Ember.isEmpty(ret[attachment.type])){
                    ret[attachment.type] = [];
                }
                   // }
               // else {
                //    attachment.id = ret.attachments.lenght; 
               // }
                if(Ember.isEmpty(attachment[attachment.type].id)){
                    attachment[attachment.type].id = Math.ceil(Math.random()*100000000);
                }
                attachment[attachment.type].user = attachment[attachment.type].user_id || attachment[attachment.type].owner_id;
                attachment[attachment.type].attachment = attachment.id;
                ret[attachment.type].push(attachment[attachment.type]);
                delete attachment[attachment.type];
                attachment.post = post.id;
                //attachments.push(attachment.id);
                //console.log(attachments);
                ret.attachments.push(attachment);
                //console.log(ret);
            });
            delete  post.attachments;
            //post.attachments = attachments.toString();
            //console.log(post.attachments);
           }
        });
        ret[pluralTypeKey] = payload.response.posts;
        ret['user'] = payload.response.profiles;
        /*ret['comments'] = [];
        ret.comments[0] = {id: 1234,  text: 'idi nahuuuy'};
        ret.comments[1] = {id: 2345,  text: 'idi nahuuuy, blaaa'};
        console.log(ret);*/


        return this._normalizeResponse(store, primaryModelClass, ret, id, requestType, false);
},
keyForAttribute: function(key) {
    return Ember.String.underscore(key);
  }
});
