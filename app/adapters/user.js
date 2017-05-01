import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    host: 'https://api.vk.com',
    namespace: 'method/users.get',
    pathForType: function() {
        return '';
    },
    ajaxOptions: function(url, type, options){
        var hash = this._super(url, type, options);
        hash.dataType = 'jsonp';
        return hash;
    },
    urlForFindRecord(id) {
        let baseUrl = this.buildURL();
    return `${baseUrl}?user_ids=${id}&version=5.7`;
  }
});