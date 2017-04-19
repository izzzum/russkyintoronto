import Ember from 'ember';

export default Ember.Route.extend({
    count: 8,
    store: Ember.inject.service(),
      afterModel: function() {
        this.controllerFor('index').set('count', this.get('count'));
        if(this.controllerFor('index').get('scrollPosition')){
            Ember.$('body').addClass("no-scroll");
            Ember.$('body').stop().animate({
                scrollTop: this.controllerFor('index').get('scrollPosition')
            }, 1000, function(){
                Ember.$('body').removeClass("no-scroll");
            });
        }
    },
    model: function() {
        let posts = this.get('store').peekAll('post');
        if (Ember.isEmpty(posts) || posts.content.length < this.get('count')){
            this.store.adapterFor('post').set('namespace', "method/wall.get");
                return Ember.RSVP.hash({
            posts: this.store.query('post', {domain: 'russiansintoronto', filter:'all', extended:1, fields: 'profiles', count: this.get('count'), offset: 0, v: '5.7'}),
        });
        }else{
            let model = {};
            model.posts = posts;
            return model;
        }
  },
  renderTemplate(controller, model) {
      this._super(controller, model);
      this.render('generic-nav', {
          into: 'application',
          outlet: 'nav-menu'
      });
      this.render('loader', {
          into: 'application',
          outlet: 'loading'
      });
    },
  deactivate: function() {
      this.controllerFor('index').set('scrollPosition', Ember.$('body').scrollTop());
  }
});
 