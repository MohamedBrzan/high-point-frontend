import StyledButton from '../../../common/StyledButton/StyledButton';
import Container from 'react-bootstrap/Container';
import './AppIntro.css';
import { useTranslation } from 'react-i18next';

const AppIntro = ({ headText, headTextAr }) => {
  const { t, i18n } = useTranslation();

  return (
    <section className='app-intro'>
      <Container className='position-relative'>
        <div className='main-intro-text'>
          {headText && headTextAr ? (
            <div>
              <div>
                {t('hpt_page.interface_page.intro.title', {
                  en: headText.first_text,
                  ar: headTextAr.first_text_ar,
                })}
              </div>
              <div>
                {t('hpt_page.interface_page.intro.title', {
                  en: headText.middle_text,
                  ar: headTextAr.middle_text_ar,
                })}
              </div>
              <div>
                {t('hpt_page.interface_page.intro.title', {
                  en: headText.last_text,
                  ar: headTextAr.last_text_ar,
                })}
              </div>
            </div>
          ) : null}
        </div>
        <div
          className='change-btn-position'
          style={i18n.language === 'en' ? { left: 20 } : { right: 20 }}
        >
          <StyledButton
            color='white'
            bgColor='#2b028d'
            borderColor='white'
            borderRightColor={i18n.language === 'en' ? 'white' : ''}
            borderLeftColor={i18n.language === 'ar' ? 'white' : ''}
            wordPadding='0.5em 3em'
            iconDir={i18n.language === 'en' ? 'ltr' : 'rtl'}
          >
            {t('explore_btn')}
          </StyledButton>
        </div>
      </Container>
    </section>
  );
};

export default AppIntro;
