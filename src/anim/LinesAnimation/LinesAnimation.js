import { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './LinesAnimation.css';

const LinesAnimation = () => {
  useEffect(() => {
    /*********** Lines Animation ******* */
    const linesGroupOne = document.querySelectorAll(
      '.lines-animation.lines-wrapper .lines-group.one'
    );

    const linesGroupTwo = document.querySelectorAll(
      '.lines-animation.lines-wrapper .lines-group.two'
    );

    const smallDashedLines = document.querySelectorAll(
      '.lines-animation .line-dashed-small'
    );

    setInterval(() => {
      linesGroupOne.forEach((lines_group_one) => {
        lines_group_one.style.animation =
          'changingLinesOneTranslate 3s infinite alternate ease-in-out';
      });
      linesGroupTwo.forEach((lines_group_two) => {
        lines_group_two.style.animation =
          'changingLinesTwoTranslate 3s infinite alternate ease-in-out';
      });

      smallDashedLines.forEach((small_dashed_line) => {
        small_dashed_line.style.animation =
          'changingLineSmallTranslate 1s alternate ease-in-out';

        if (small_dashed_line.classList.contains('first-small-line')) {
          small_dashed_line.style.animationDelay = '1s';
        } else if (small_dashed_line.classList.contains('last-small-line')) {
          small_dashed_line.style.animationDelay = '1.5s';
        }
        // firstSmallDashedLine.forEach((first_dashed_line) => {

        // });
        // secondSmallDashedLine.forEach((second_dashed_line) => {
        //   second_dashed_line.style.animationDelay = '1.5s';
        // });
      });

      setTimeout(() => {
        linesGroupOne.forEach((lines_group_one) => {
          lines_group_one.style.animation = '';
        });
        linesGroupTwo.forEach((lines_group_two) => {
          lines_group_two.style.animation = '';
        });

        smallDashedLines.forEach((small_dashed_line) => {
          small_dashed_line.style.animation = '';
        });
      }, 6000);
    }, 9000);
  }, []);

  return (
    <Row className='lines-animation lines-wrapper'>
      <Col className='lines-group one d-flex justify-content-between align-items-center'>
        {' '}
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </Col>
      <Col className='animation-col d-flex justify-content-between align-items-center'>
        {' '}
        <div className='line-dashed-small first-small-line'></div>
        <div className='line-dashed'></div>
        <div className='line-dashed-small last-small-line'></div>
      </Col>
      <Col className='lines-group two d-flex justify-content-between align-items-center'>
        {' '}
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </Col>
    </Row>
  );
};

export default LinesAnimation;
