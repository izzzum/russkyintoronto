import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['video-attachment'],
    loading: false,
    youtube: false,
    showIframe: false,
    store: Ember.inject.service(),
    didReceiveAttrs: function(){
        if(this.get('video.platform') === 'YouTube'){
            let _this = this;
            this.set('loading', true);
            this.set('youtube', true);
            let store = this.get('store');
            let video = this.get('video');
            if(Ember.isEmpty(video.youtube)){
                let title = this.get('video.title');
                store.queryRecord('youtube', {key: 'AIzaSyCVsGkmf4dsvbk3zj0pdijTwuSwYe8Pcmk', part:'snippet', maxResults:1, q: title, type: 'video'}).then(
                    function(result){
                        _this.set('video.youtube', result);
                        _this.set('loading', false);
                    });
            }
        }
    },
    actions:{
        toggleIframe(){
             this.toggleProperty('showIframe');
        }
    }
});
