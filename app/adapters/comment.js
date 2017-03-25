import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    host: 'https://api.vk.com/method',
    pathForType: function(type) {
        return 'wall.getComments';
    },
    ajaxOptions: function(url, type, options){
        var hash = this._super(url, type, options);
        hash.dataType = 'jsonp';
        return hash;
    }
});