import Ember from 'ember';
//text, replyTo, fullname
export function replyToLink(text, options) {
  if (Ember.isEmpty(text) || Ember.isEmpty(options.replyTo)){
            return text;
        }
  let inputText = text.toString();
  let replacedText, replacePattern, replacement;
    replacePattern = /(\[.*\|.*\])/gim;
    replacement = `<a href="http://vk.com/id${options.replyTo}">${options.fullname}</a>`;
    replacedText = inputText.replace(replacePattern, replacement);
  
  return replacedText;
}

export default Ember.Helper.helper(replyToLink);
