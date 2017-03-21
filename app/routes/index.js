import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    store: Ember.inject.service(),
    model() {
        let store = this.get('store');
        //let user = Ember.Object.create({isNotLoaded:true});
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
        })
        //return user;
    }
});
