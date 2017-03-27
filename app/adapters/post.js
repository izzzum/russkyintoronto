import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    host: 'https://api.vk.com/method',
    pathForType: function() {
        return 'wall.get';
    },
    ajaxOptions: function(url, type, options){
        var hash = this._super(url, type, options);
        hash.dataType = 'jsonp';
        return hash;
    }
});