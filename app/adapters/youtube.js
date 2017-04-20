import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    host: 'https://www.googleapis.com',
    namespace: 'youtube/v3/search',
    pathForType: function() {
        return '';
    },
    ajaxOptions: function(url, type, options){
        var hash = this._super(url, type, options);
        hash.dataType = 'jsonp';
        return hash;
    }
});
