import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import {
  useDeleteNewsRoomMutation,
  useGetAllNewsRoomsQuery,
} from '../../store/apis/NewsRoom/NewsRoom';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import './NewsRoom.css';
import { toast } from 'react-toastify';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { createNews } from '../../store/reducers/NewsRoom/NewsRoomSlice';
import { useDispatch, useSelector } from 'react-redux';
import CreateNewsForm from './helpers/CreateNewsForm';
import EditNewsForm from './helpers/EditNewsForm';
import RemoveItem from '../../functions/RemoveItem';
import PageTitle from '../../utils/PageTitle';

const NewsRoom = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: newsRooms,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllNewsRoomsQuery();

  const [deleteNewsData, { isLoading: deleting }] = useDeleteNewsRoomMutation();

  let newsRoomOne;

  if (!isLoading && isSuccess && newsRooms.length >= 0) {
    newsRoomOne = newsRooms[0];
  }

  if (isLoading || deleting) return <CustomSpinner />;

  return (
    <section className='news_room'>
      {' '}
      <PageTitle>News Room</PageTitle>
      {isAdmin ? <CreateNewsForm refetch={refetch} /> : null}
      <div className='title'>{t('hpt_page.news_room_page.title')}</div>
      <Row className='cards_row'>
        {newsRoomOne && newsRoomOne._id && (
          <Col md={6} className='mb-3 main_card_col' key={0}>
            <Card>
              {isAdmin ? (
                <>
                  {' '}
                  <div
                    className='delete_btn'
                    onClick={() =>
                      RemoveItem(
                        'news_room',
                        deleteNewsData,
                        newsRoomOne._id,
                        refetch
                      )
                    }
                    title={t('hpt_page.card.title', {
                      en: `Delete ${newsRoomOne?.title}`,
                      ar: `حذف ${newsRoomOne?.title_ar}`,
                    })}
                  >
                    <FontAwesomeIcon icon={faTrash} size='1x' />
                  </div>
                  <EditNewsForm newsData={newsRoomOne} refetch={refetch} />
                </>
              ) : null}
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
            {newsRooms &&
              newsRooms.length >= 2 &&
              newsRooms.map(
                (newsRoom, index) =>
                  index !== 0 && (
                    <Col md={6} key={index} className='mb-3'>
                      <Card>
                        {isAdmin ? (
                          <>
                            <div
                              className='delete_btn'
                              onClick={() =>
                                RemoveItem(
                                  'news_room',
                                  deleteNewsData,
                                  newsRoom._id,
                                  refetch
                                )
                              }
                              title={t('hpt_page.card.title', {
                                en: `Delete ${newsRoom.title}`,
                                ar: `حذف ${newsRoom.title_ar}`,
                              })}
                            >
                              <FontAwesomeIcon icon={faTrash} size='1x' />
                            </div>
                            <EditNewsForm
                              newsData={newsRoom}
                              refetch={refetch}
                            />
                          </>
                        ) : null}
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
    </section>
  );
};

export default NewsRoom;
