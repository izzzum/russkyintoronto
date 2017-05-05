import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    classNames: ['user'],
    attributeBindings: ['href'],
    href: Ember.computed(function(){
        return `http://vk.com/id${this.get('user').id}`;
    })
});
