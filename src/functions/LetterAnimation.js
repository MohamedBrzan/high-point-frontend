function LetterAnimation(iterationValue) {
  return iterationValue.forEach((letter, index) => {
    const splitIndex = index.toString().split('');

    if (splitIndex.length === 1) {
      letter.style.transition = ``;
      letter.style.animation = `headSpanChangOpacity .01s 0.${splitIndex}s alternate forwards`;
    } else if (splitIndex.length > 1 && splitIndex.length !== 3) {
      letter.style.transition = ``;
      letter.style.animation = `headSpanChangOpacity .01s ${splitIndex[0]}.${splitIndex[1]}s alternate forwards`;
    } else if (splitIndex.length === 3) {
      letter.style.transition = ``;
      letter.style.animation = `headSpanChangOpacity .01s ${splitIndex[0]}${splitIndex[1]}.${splitIndex[2]}s alternate forwards`;
    }
  });
}

export default LetterAnimation;
