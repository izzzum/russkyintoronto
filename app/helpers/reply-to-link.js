import Ember from 'ember';
//text, replyTo, fullname
export function replyToLink(text) {
  if (Ember.isEmpty(text)){
            return text;
        }
  let inputText = text.toString();
  let replacedText, replacePattern, replacement;
    replacement = '';
    replacePattern = /(\[.*\|.*\])/gim;
    replacedText = inputText.replace(replacePattern, replacement);
  
  return replacedText;
}

export default Ember.Helper.helper(replyToLink);
