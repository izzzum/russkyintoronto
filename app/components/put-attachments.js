import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['attachments'],
    links: null,
    photos: null,
    audios: null,
    videos: null,
    sticker: null,
    poll: null,
    page: null,
    app: null,
    note: null,
    doc: null,
    graffiti: null,
    didInsertElement: function(){
        this.set('links', Ember.A());
        this.set('photos', Ember.A());
        this.set('audios', Ember.A());
        this.set('videos', Ember.A());
        let attachments = this.get('attachments');
        attachments.forEach(attachment =>{
            if(attachment.get('type') === 'link'){
                 this.get('links').addObject(attachment.get('link'));
            }
            else if(attachment.get('type') === 'photo'){
                this.get('photos').addObject(attachment.get('photo'));
            }
            else if(attachment.get('type') === 'postedPhoto'){
                this.get('photos').addObject(attachment.get('postedPhoto'));
            }
            else if(attachment.get('type') === 'video'){
                this.get('videos').addObject(attachment.get('video'));
            }
            else if(attachment.get('type') === 'audio'){
                this.get('audios').addObject(attachment.get('audio'));
            }
            else if(attachment.get('type') === 'sticker'){
                this.set('sticker', attachment.get('sticker'));
            }
            else if(attachment.get('type') === 'poll'){
                this.set('poll', attachment.get('poll'));
            }
            else if(attachment.get('type') === 'page'){
                this.set('page', attachment.get('page'));
            }
            else if(attachment.get('type') === 'note'){
                this.set('note', attachment.get('note'));
            }
            else if(attachment.get('type') === 'app'){
                this.set('app', attachment.get('app'));
            }
            else if(attachment.get('type') === 'doc'){
                this.set('doc', attachment.get('doc'));
            }
            else if(attachment.get('type') === 'grafitti'){
                this.set('grafitti', attachment.get('grafitti'));
            }
        });
    },
});
