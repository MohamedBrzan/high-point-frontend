import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import arrowEn from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import './Blog.css';
import AppSlider from '../../Components/Slider/AppSlider';

const ViewBlog = () => {
  const { t, i18n } = useTranslation();
  const { blog } = useSelector((state) => state.blog);

  return (
    <section className='view_blog'>
      <div className='view_blog_title'>
        <div className='title_container'>
          {i18n.language === 'en' ? (
            <>
              {' '}
              <span className='arrow'>
                <img src={arrowEn} alt='' />
              </span>
              <span className='arrow_title'>
                {t('hpt_page.view_blog_page.title')}
              </span>
            </>
          ) : (
            <>
              {' '}
              <span className='arrow'>
                <img src={arrowAr} alt='' />
              </span>
              <span className='arrow_title'>
                {t('hpt_page.view_blog_page.title')}
              </span>
            </>
          )}
        </div>
        <Container className='main_container'>
          <div>
            <div className='content title'>
              {t('hpt_page.view_blog_page.blog.title', {
                en: blog.title,
                ar: blog.title_ar,
              })}
            </div>
            <div className='content sub_description'>
              {t('hpt_page.view_blog_page.blog.sub_description', {
                en: blog.sub_description,
                ar: blog.sub_description_ar,
              })}
            </div>
          </div>
        </Container>
        <div className='image_content'>
          <Container className='image_container'>
            <div className='date'>{new Date().toDateString()}</div>
            <AppSlider images={blog.head_images} />
          </Container>{' '}
        </div>
        <Container className='main_container'>
          <div>
            <div className='content description'>
              {t('hpt_page.view_blog_page.blog.description', {
                en: blog.description,
                ar: blog.description_ar,
              })}
            </div>
          </div>
        </Container>{' '}
        <div className='image_content'>
          <Container className='image_container'>
            <div className='date'>{new Date().toDateString()}</div>
            <AppSlider images={blog.footer_images} />
          </Container>{' '}
        </div>
      </div>
      <div className='owner_info'>
        <div className='avatar'>
          <img src={blog.owner.avatar} alt='Avatar.' className='w-100' />
        </div>{' '}
        <div className='info'>
          <div className='name'>{blog.owner.name}</div>
          <div className='date'>{new Date().toDateString()}</div>
        </div>{' '}
      </div>
    </section>
  );
};

export default ViewBlog;
