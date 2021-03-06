export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('post'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
    this.transition(
    this.fromRoute('index'),
    this.toRoute('stats'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
    this.transition(
    this.fromRoute('stats','stats.top-comments','stats.top-posts'),
    this.toRoute('post'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
  this.transition(
  this.hasClass('magical'),
  this.use('crossFade')
);
    this.transition(
    this.fromRoute('stats.index'),
    this.toRoute('stats.comments'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
    this.transition(
    this.fromRoute('stats.index'),
    this.toRoute('stats.likes'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
    this.transition(
    this.fromRoute('stats.index'),
    this.toRoute('stats.posts'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
    this.transition(
    this.fromRoute('stats.index'),
    this.toRoute('stats.top-comments'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
    this.transition(
    this.fromRoute('stats.index'),
    this.toRoute('stats.top-posts'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
}
