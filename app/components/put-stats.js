import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['statistics']
    /*store: Ember.inject.service(),
    posts: Ember.computed(function(){this.set('posts', this.get('store').peekAll('post'));}),
    comments: Ember.computed(function(){this.set('comments', this.get('store').peekAll('comment'));}),
    users: Ember.computed(function(){this.set('users', this.get('store').peekAll('user'));}),*/
   /* postsC: Ember.computed('list', function(){
        let posts = this.get('list.posts');
        if(!Ember.isEmpty(posts)){
        let listOfTopCommented = [];
            posts.forEach(post =>{
                listOfTopCommented.push({post: post.get('id'), items: post.get('commentsNum')});
            });
        listOfTopCommented.sort(this.get('sortByNumber'));
        listOfTopCommented = listOfTopCommented.slice(0,3);
        return listOfTopCommented;
        }
    }),
    usersC: Ember.computed('list', function(){
        let users = this.get('list.users');
        if(!Ember.isEmpty(users)){
        let listOfComments = [];
        let listOfPosts = [];
            users.forEach(user =>{
                listOfComments.push({user: user.get('id'), items: user.get('comments').content.currentState.length});
                listOfPosts.push({user: user.get('id'), items: user.get('posts').content.currentState.length});
            });
        listOfComments.sort(this.get('sortByNumber'));
        listOfPosts.sort(this.get('sortByNumber'));
        listOfComments = listOfComments.slice(0,3);
        listOfPosts = listOfPosts.slice(0,3);
        let ret = {};
        ret.comments = listOfComments;
        ret.posts = listOfPosts;
        return ret;
        }

    }),
    commentsC: Ember.computed('list', function(){
        let comments = this.get('list.comments');
        if(!Ember.isEmpty(comments)){
        let listOfMostLikedComments = [];
            comments.forEach(comment =>{
                    listOfMostLikedComments.push({comment: comment.get('id'), items: comment.get('likes')});
                });
         listOfMostLikedComments.sort(this.get('sortByNumber'));
         listOfMostLikedComments = listOfMostLikedComments.slice(0,3);
         return listOfMostLikedComments;
        }
    }),
    sortByNumber: function(a,b) {
        return ((a.items > b.items) ? -1 : ((a.items == b.items) ? 0 : 1));
    }*/
});
