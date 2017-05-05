import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate(controller, model) {
      this._super(controller, model);
      this.render('generic-nav', {
          into: 'application',
          outlet: 'nav-menu'
      });
    },
    model: function(){
        if(Ember.isEmpty(this.controllerFor('stats.likes').get('likes'))){
            this.transitionTo('stats.index');
        }else{
            this.controllerFor('stats.likes').set('loaded', 20);
            return this.controllerFor('stats.likes').get('likes');
        }
    }
});