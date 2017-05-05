import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['link-attachment'],
    url: Ember.computed(function(){
        let url = this.get('link.url');
        return `http://image.thum.io/get/width/500/crop/600/${url}`;
    }),
    desc: Ember.computed(function(){
        let desc = this.get('link.description').slice(0, 30);
        return Ember.isEmpty(desc)?null:`${desc}...`;
    })
});
