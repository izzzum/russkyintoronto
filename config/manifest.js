/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    "short_name": "RT",
    "name": "Russky in Toronto",
    "description": "Russky in Toronto Vk mirror",
    "icons": [
      {
        "src": "/assets/icons/icon-600x600.png",
        "sizes": "600x600",
        "type": "image/png"
      },
      {
        "src": "/assets/icons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "/assets/icons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      }
    ],
    "start_url": "/",
    "display": "standalone",
    "background_color": "#45688E",
    "theme_color": "#45688E"
  };
}
