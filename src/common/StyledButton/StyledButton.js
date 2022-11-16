import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BtnTextAnimation from '../../functions/BtnTextAnimation';
import LetterAnimation from '../../functions/LetterAnimation';
import CleanAnimation from '../../functions/CleanAnimation';
import './StyledButton.css';

const StyledButton = ({
  children,
  margin,
  color,
  width,
  wordPadding,
  borderWidth,
  borderStyle,
  borderColor,
  borderRightWidth,
  borderRightStyle,
  borderRightColor,
  borderLeftWidth,
  borderLeftStyle,
  borderLeftColor,
  bgColor,
  goToLocation,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const customStyledButtons = document.querySelectorAll(
      '.custom-styled-button'
    );
    const customArrowIcon = document.querySelectorAll(
      '.arrow-icon .custom-arrow-icon'
    );

    const btnText = document.querySelectorAll(
      '.custom-styled-button .explore-word span.btn_span_text'
    );
    /******* Button *******/
    customStyledButtons.forEach((button) => {
      button.onmouseenter = (btn) => {
        btn.target.lastElementChild.style.animation = '';
        setTimeout(() => {
          btn.target.lastElementChild.style.animation =
            'bounceAlpha 0.2s linear alternate';
          // LetterAnimation(btnText);
        }, 10);
      };

      button.onmouseleave = (btn) => {
        btn.target.lastElementChild.style.animation = '';
        setTimeout(() => {
          btn.target.lastElementChild.style.animation =
            'bounceAlpha 0.2s linear alternate-reverse';
          // CleanAnimation(btnText);
        }, 10);
      };
    });

    /******* Icon *******/
    customArrowIcon.forEach((icon) => {
      icon.onmouseenter = (svgIcon) => {
        svgIcon.style.animation = '';
        setTimeout(() => {
          svgIcon.style.animation = 'bounceAlpha 0.2s linear alternate';
          // LetterAnimation(btnText);
        }, 10);
      };

      icon.onmouseleave = (svgIcon) => {
        svgIcon.style.animation = '';
        setTimeout(() => {
          svgIcon.style.animation = 'bounceAlpha 0.2s linear alternate-reverse';
          // CleanAnimation(btnText);
        }, 10);
      };
    });
  }, []);
  return (
    <div
      onClick={() => {
        if (goToLocation) {
          navigate(`${goToLocation}`);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }}
      className='custom-styled-button'
      style={{
        color: color ? color : 'black',
        borderWidth: borderWidth ? borderWidth : '1px',
        borderStyle: borderStyle ? borderStyle : 'solid',
        borderColor: borderColor ? borderColor : '#2b028d',
        backgroundColor: bgColor ? bgColor : 'transparent',
        width: width ? width : 'fit-content',
        margin:
          i18n.language === 'en'
            ? margin
              ? margin
              : '0 0 0 auto'
            : i18n.language === 'ar'
            ? margin
              ? margin
              : '0 auto 0 0'
            : '0',
      }}
    >
      <div
        className='explore-word'
        style={{
          padding: wordPadding ? wordPadding : '.5em .9em',
        }}
      >
        {BtnTextAnimation(children, 'btn_span_text')}
      </div>
      <div className='pipe_line'></div>
      <div className='arrow-icon'>
        <FontAwesomeIcon
          icon={i18n.language === 'ar' ? faAnglesLeft : faAnglesRight}
          className='custom-arrow-icon'
          size='sm'
        />
      </div>
    </div>
  );
};

export default StyledButton;
