import Ember from 'ember';

export default Ember.Route.extend({
    //ajax: Ember.inject.service(),
    store: Ember.inject.service(),
    model() {
           return Ember.RSVP.hash({
      //user: this.store.queryRecord('user', {user_id: 567*34, v: '5.0'}),
      posts: this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: 8, offset: 0, v: '5.7'}),
      //comments: this.store.query('comment', {owner_id: '-164278', post_id: 185094, extended:1, oauth: 1, /*count: 4, offset: 1,*/ need_likes: 1, v: '5.7'})
    });

  },
  

  /*setupController(controller, model) {
    this._super(...arguments);
    //Ember.set(controller, 'user', model.user);
    //Ember.set(controller, 'post', model.posts);
        //let store = this.get('store');
        //return store.queryRecord('user', {user_id: 567*34, v: '5.0'});
        //return store.queryRecord('item', {user_id: 567*34, v: '5.0'});
        /*let user = Ember.Object.create({isNotLoaded:true});
        let params = {user_id:'1', v:'5.0'};
        let url = 'https://api.vk.com/method/users.get';
        let method = 'GET';
        return this.get('ajax').request(url, {
            method: method,
            data: params,
            dataType: 'jsonp'
        }).then(function(json){
            return json.response[0];
            //user.setProperties(json.response[0]);
            //user.set('isNotLoaded', false);
            //let storeData = '{"data": {"type": "user","id":"'+json.response[0].id+'","attributes": {"firstName":"'+json.response[0].first_name+'","id":"'+json.response[0].id+'","lastName":"'+json.response[0].last_name+'"}}}';
            //store.pushPayload(JSON.parse(storeData));
            //return JSON.parse(storeData)
        })*/
        //return user;
   // }
});
