import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  sex: DS.attr('string'),
  screenName: DS.attr('string'),
  photo50: DS.attr('string'),
  photo100: DS.attr('string'),
  online: DS.attr('string'),
  posts: DS.hasMany('post', {async: true}),
  comments: DS.hasMany('comment', {async: true, inverse: 'user'}),
  likes: Ember.computed('comments', 'posts', function(){
    let likes = 0;
    if(Ember.isPresent(this.get('posts'))){
       this.get('posts').forEach(post => {
        likes += parseInt(post.get('likes'));
      });
    }
    if(Ember.isPresent(this.get('comments'))){
      this.get('comments').forEach(comment => {
        likes += parseInt(comment.get('likes'));
      });
    }
    return likes;
  }),
  fullName: Ember.computed(function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  leftComments: Ember.computed('comments', function(){
    if(Ember.isPresent(this.get('comments'))){
      return parseInt(this.get('comments').content.currentState.length);
    }else{
      return 0;
    }
  }),
    leftPosts: Ember.computed('posts', function(){
    if(Ember.isPresent(this.get('posts'))){
      return parseInt(this.get('posts').content.currentState.length);
    }else{
      return 0;
    }
  })
});
