import { t } from 'i18next';

// Text Animation
const BtnTextAnimation = (text, className) => {
  let wordArr = [];
  let word = text.split('');

  for (let i in word) {
    wordArr.push(word[i]);
  }
  return wordArr.map((text, index) => (
    <span key={index} className={className}>
      {text}
    </span>
  ));
};
export default BtnTextAnimation;
