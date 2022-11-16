import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import logo from '../../../images/logo.png';
import LinesAnimation from '../../../anim/LinesAnimation/LinesAnimation';
import StyledButton from '../../../common/StyledButton/StyledButton';
import './NewsRoomComponent.css';
import { useGetAllNewsRoomsQuery } from '../../../store/apis/NewsRoom/NewsRoom';
import TextAnimation from '../../../functions/TextAnimation';
import { useTranslation } from 'react-i18next';
import { createNews } from '../../../store/reducers/NewsRoom/NewsRoomSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewsRoomComponent = ({ footer }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useGetAllNewsRoomsQuery();

  let newsRoomOne;

  if (!isLoading && isSuccess && data.length >= 0) {
    newsRoomOne = data[0];
  }

  return (
    <>
      <section className='news-room_component'>
        <Container fluid>
          <Row className='justify-content-between align-items-center'>
            <Col className='head_text'>
              <span className='number pe-2'>
                {' '}
                {TextAnimation(
                  'hpt_page.interface_page.news_room.name',
                  'number_span_text',
                  null,
                  null,
                  '04'
                )}
              </span>
              <span className='title'>
                {TextAnimation(
                  'hpt_page.interface_page.news_room.name',
                  'news_room_span_text',
                  'NewsRoom',
                  'غرفة الأخبار',
                  null
                )}
              </span>
            </Col>
            <Col className='news-room-col-btn'>
              <StyledButton goToLocation='/news_room'>
                {t('explore_btn')}
              </StyledButton>
            </Col>
          </Row>
          <hr className='news-room-head-hr' />
          <Row className='cards_row'>
            {newsRoomOne && newsRoomOne._id && (
              <Col md={6} className='mb-3 main_card_col' key={0}>
                <Card>
                  <Card.Img src={newsRoomOne?.images[0]} />
                  <Card.Body
                    onClick={() => {
                      dispatch(createNews(newsRoomOne));
                      navigate('/news_room/0');
                    }}
                  >
                    <Card.Title>
                      {t('hpt_page.news_room_page.news.title', {
                        en: newsRoomOne?.title,
                        ar: newsRoomOne?.title_ar,
                      })}
                    </Card.Title>
                  </Card.Body>
                  <div className='info_data'>
                    <div md={6}>
                      <img src={logo} alt='LOGO' />
                    </div>
                    <div md={6}>{new Date().toDateString()}</div>
                  </div>
                </Card>
              </Col>
            )}
            <Col md={6} className='card_col'>
              <Row>
                {data &&
                  data.length >= 2 &&
                  data.map(
                    (newsRoom, index) =>
                      index !== 0 && (
                        <Col md={6} key={index} className='mb-3'>
                          <Card>
                            {' '}
                            <Card.Img src={newsRoom.images[0]} />
                            <Card.Body
                              onClick={() => {
                                dispatch(createNews(newsRoom));
                                navigate(`/news_room/${index}`);
                              }}
                            >
                              <Card.Title>
                                {t('hpt_page.news_room_page.news.title', {
                                  en: newsRoom.title,
                                  ar: newsRoom.title_ar,
                                })}
                              </Card.Title>
                            </Card.Body>{' '}
                            <div className='info_data'>
                              <div md={6}>
                                <img src={logo} alt='LOGO' />
                              </div>
                              <div md={6}>{new Date().toDateString()}</div>
                            </div>
                          </Card>
                        </Col>
                      )
                  )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='news-room-section-two'>
        <Container fluid>
          {footer ? (
            <Row className='animation_earth_row'>
              <Col xs={12} lg={4} id='world_map' className='NewsRoom_work_col'>
                <div className='map_text'>
                  <span className='colored_text'>
                    {' '}
                    {t('map_text', {
                      en: footer.map_text.colored_text,
                      ar: footer.map_text.colored_text_ar,
                    })}
                  </span>
                  <span className='custom_text'>
                    {' '}
                    {t('map_text', {
                      en: footer.map_text.custom_text,
                      ar: footer.map_text.custom_text_ar,
                    })}
                  </span>
                </div>
                {/* <div className='animation'>
                  <picture>
                    <img src={footer.logo_img} alt='Animation' />
                  </picture>
                </div> */}
                <div className='change-btn-position'>
                  <StyledButton
                    margin='0'
                    color='white'
                    borderColor='white'
                    goToLocation='/contact_us'
                  >
                    {t('btn_name', {
                      en: footer.btn_one,
                      ar: footer.btn_one_ar,
                    })}
                  </StyledButton>
                </div>
              </Col>
              <Col xs={12} lg={8} className='NewsRoom_request_col'>
                <Row>
                  <Col xs={12} md={6} className='NewsRoom_request_content'>
                    <h1 className='text'>
                      {t('work_text', {
                        en: footer.text,
                        ar: footer.text_ar,
                      })}
                    </h1>
                    <StyledButton
                      margin='0'
                      color='white'
                      borderColor='white'
                      goToLocation='/privacy&cookies'
                    >
                      {t('btn_name', {
                        en: footer.btn_two,
                        ar: footer.btn_two_ar,
                      })}
                    </StyledButton>
                  </Col>
                  <Col xs={12} md={6} className='newsroom-wrapper'>
                    <LinesAnimation />
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : null}
        </Container>
      </div>
    </>
  );
};

export default NewsRoomComponent;
