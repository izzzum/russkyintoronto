import Ember from 'ember';

export default Ember.Service.extend({
    name:'russiansintoronto',
    groupId: '-164278',
    defaultStatsAmount: 50,
    defaultStatsButtonVal: 100,
    maxStatsValue: 1000,
    postLoadAmount: 8,
    header: 'Russky in Toronto<sup><i class="fa fa-vk"></i></sup>',
    footer: 'You\'re not making it easy <i class="fa fa-copyright" aria-hidden="true"></i> 2017'
});
