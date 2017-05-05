import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('not-found', { path: '/*path' });
  this.route('post', { path: '/post/:postId' });
  this.route('stats', function() {
    this.route('comments');
    this.route('likes');
    this.route('posts');
    this.route('top-posts');
    this.route('top-comments');
  });
});

export default Router;
