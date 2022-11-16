import { t } from 'i18next';

// Text Animation
const TextAnimation = (translateDist, className, wordEn, wordAr, number) => {
  let wordArr = [];
  let word;
  if ((wordEn, wordAr)) {
    word = t(translateDist, {
      en: wordEn,
      ar: wordAr,
    }).split('');
  } else {
    word = number.split('');
  }

  for (let i in word) {
    wordArr.push(word[i]);
  }
  return wordArr.map((text, index) => (
    <span key={index} className={className}>
      {text}
    </span>
  ));
};
export default TextAnimation;
