import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    host: 'http://api.russky.ca',
    namespace: 'method/wall.get',
    pathForType: function() {
        return '';
    },
    ajaxOptions: function(url, type, options){
        var hash = this._super(url, type, options);
        hash.dataType = 'jsonp';
        return hash;
    }
});