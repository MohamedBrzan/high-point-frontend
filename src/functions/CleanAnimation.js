function CleanAnimation(iterationValue) {
  return iterationValue.forEach(
    (letter, index) => (letter.style.animation = ``)
  );
}

export default CleanAnimation;
