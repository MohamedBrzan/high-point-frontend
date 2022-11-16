import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AppSlider from '../../Components/Slider/AppSlider';
import arrowEn from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import PageTitle from '../../utils/PageTitle';
import './NewsRoom.css';

const ViewNews = () => {
  const { t, i18n } = useTranslation();
  const { news } = useSelector((state) => state.news);

  return (
    <section className='view_news'>
      {' '}
      <PageTitle>{`${news?.title}`}</PageTitle>
      <div className='view_news_title'>
        <div className='title_container'>
          {i18n.language === 'en' ? (
            <>
              <span className='arrow'>
                <img src={arrowEn} alt='' />
              </span>
              <span className='arrow_title'>
                {t('hpt_page.view_news_room_page.title')}
              </span>
            </>
          ) : (
            <>
              <span className='arrow'>
                <img src={arrowAr} alt='' />
              </span>
              <span className='arrow_title'>
                {t('hpt_page.view_news_room_page.title')}
              </span>
            </>
          )}
        </div>
        <Container className='main_container'>
          <div>
            <div className='content title'>
              {t('hpt_page.view_news_room_page.news.title', {
                en: news.title,
                ar: news.title_ar,
              })}
            </div>
            <div className='content sub_description'>
              {t('hpt_page.view_news_room_page.news.sub_description', {
                en: news.sub_description,
                ar: news.sub_description_ar,
              })}
            </div>
          </div>
        </Container>
        <div className='image_content'>
          <Container className='image_container'>
            <div className='date'>{new Date().toDateString()}</div>
            <AppSlider images={news.images} />
          </Container>
        </div>
        <Container className='main_container'>
          <div>
            <div className='content description'>
              {t('hpt_page.view_news_room_page.news.description', {
                en: news.description,
                ar: news.description_ar,
              })}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ViewNews;
