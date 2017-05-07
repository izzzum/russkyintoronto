export function initialize(application) {
  application.inject('route', 'settings', 'service:settings');
  application.inject('component', 'settings', 'service:settings');
  application.inject('controller', 'settings', 'service:settings');
}

export default {
  name: 'settings',
  initialize
};
