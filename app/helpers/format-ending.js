import Ember from 'ember';

export function formatEnding(params, args) {
  let word = '';
  let checkWord = args.word.toString();
  let num = parseInt(args.num);
  let numLength = num.toString().length;
  if((numLength === 2 && num > 19) || (numLength === 3 && num > 119)){
      num = num%10;
    }
  if(checkWord==='comment'){
    if(num === 1){
      word = 'комментарий';
    }
    else if(num > 1 && num <5) {
      word = 'комментария';
    }
    else{
      word = 'комментариев';
    }
  }
  else if(checkWord==='post'){
    if(num === 1){
      word = 'пост';
    }
    else if(num > 1 && num <5) {
      word = 'поста';
    }
    else{
      word = 'постов';
    }
  }
  else if(checkWord==='user'){
    if(num === 1){
      word = 'пользователь';
    }
    else if(num > 1 && num <5) {
      word = 'пользователя';
    }
    else{
      word = 'пользователей';
    }
  }

  return word;
}

export default Ember.Helper.helper(formatEnding);
