import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteServiceCardMutation,
  useGetAllServicesCardQuery,
} from '../../../store/apis/ServicesCard/ServicesCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LinesAnimation from '../../../anim/LinesAnimation/LinesAnimation';
import {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
} from '../../../store/apis/HptServices/HptServices';
import titleArrow from '../../../images/title_arrow.svg';
import { createServiceCard } from '../../../store/reducers/services/Card';
import EditService from '../CRUD_System/Edit/Service/EditService';
import './HptServicesPage.css';
import EditServiceCard from '../CRUD_System/Edit/Card/EditServiceCard';
import CreateNewServiceCard from '../CRUD_System/Create/CreateCard';
import CreateServiceTab from '../CRUD_System/Create/CreateTab';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';
import TextAnimation from '../../../functions/TextAnimation';
import { useEffect } from 'react';
import LetterAnimation from '../../../functions/LetterAnimation';
import CleanAnimation from '../../../functions/CleanAnimation';
// import NuclearAnimation from '../../../anim/NuclearAnimation/NuclearAnimation';
import RemoveItem from '../../../functions/RemoveItem';
import PageTitle from '../../../utils/PageTitle';

const HptServicesPage = () => {
  const { t, i18n } = useTranslation();
  const { data: allServices, isLoading } = useGetAllServicesQuery();
  const { data: service, isLoading: serviceIsLoading } = useGetServiceByIdQuery(
    allServices && allServices[0] && allServices[0]._id
      ? allServices[0]._id
      : ''
  );

  const {
    data: servicesCard,
    isLoading: servicesCardIsLoading,
    refetch,
  } = useGetAllServicesCardQuery();

  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteCard] = useDeleteServiceCardMutation();

  useEffect(() => {
    if (service) {
      window.onscroll = () => {
        const titleText = document.querySelectorAll(
          '.hpt-services-page span.title_span_text'
        );

        const subTitleText = document.querySelectorAll(
          '.hpt-services-page .service_sub_title span.sub_title_span_text'
        );

        const cardTitleText = document.querySelectorAll(
          '.hpt-services-page span.card_title_span_text'
        );

        const footerText = document.querySelectorAll(
          '.hpt-services-page span.footer_span_text'
        );
        if (titleText) {
          if (window.scrollY >= 300) {
            LetterAnimation(titleText);
          } else {
            CleanAnimation(titleText);
          }
        }

        if (subTitleText) {
          if (window.scrollY >= 300) {
            LetterAnimation(subTitleText);
          } else {
            CleanAnimation(subTitleText);
          }
        }

        if (cardTitleText) {
          if (window.scrollY >= 800) {
            LetterAnimation(cardTitleText);
          } else {
            CleanAnimation(cardTitleText);
          }
        }

        if (footerText) {
          if (window.scrollY >= 1400) {
            LetterAnimation(footerText);
          } else {
            CleanAnimation(footerText);
          }
        }
      };

      const headTextSpan = document.querySelectorAll(
        '.hpt-services-page .header_text span.head_span_text'
      );

      const introColoredText = document.querySelectorAll(
        '.hpt-services-page .intro_text span.intro_span_text'
      );

      if (headTextSpan) {
        LetterAnimation(headTextSpan);
      }
      if (introColoredText) {
        LetterAnimation(introColoredText);
      }
    }
  }, [service]);

  if (isLoading) return <CustomSpinner />;

  return (
    <section className='hpt-services-page'>
      {' '}
      <PageTitle>Hpt Services</PageTitle>
      <div className='section-head-image'></div>
      {/* <div className='nuclear_canvas_container'>{NuclearAnimation()}</div> */}
      {isAdmin ? <EditService /> : null}
      {service && service._id && (
        <>
          <Row className='service_row'>
            <Col md={8} className='service_text'>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.first_text',
                  'head_span_text',
                  service.header_text.first_text,
                  service.header_text_ar.first_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.second_text',
                  'head_span_text',
                  service.header_text.second_text,
                  service.header_text_ar.second_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.third_text',
                  'head_span_text',
                  service.header_text.third_text,
                  service.header_text_ar.third_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.fourth_text',
                  'head_span_text',
                  service.header_text.fourth_text,
                  service.header_text_ar.fourth_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.fifth_text',
                  'head_span_text',
                  service.header_text.fifth_text,
                  service.header_text_ar.fifth_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.sixth_text',
                  'head_span_text',
                  service.header_text.sixth_text,
                  service.header_text_ar.sixth_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.seventh_text',
                  'head_span_text',
                  service.header_text.seventh_text,
                  service.header_text_ar.seventh_text_ar,
                  null
                )}
              </div>
              <div className='intro_text'>
                {TextAnimation(
                  'hpt_page.intro_text',
                  'intro_span_text',
                  service.intro_text,
                  service.intro_text_ar,
                  null
                )}
              </div>
            </Col>

            <Col md={4} className='service_img'>
              <picture>
                <img
                  src={service.head_image}
                  alt='Head_Image'
                  className='w-100'
                />
              </picture>
            </Col>
          </Row>
          <div className='content_title'>
            <div className='service_title_container'>
              <div className='service_title'>
                {service &&
                  TextAnimation(
                    'hpt_page.title.first_text',
                    'title_span_text',
                    service.title.first_title_text,
                    service.title_ar.first_title_text_ar,
                    null
                  )}
              </div>
              <div className='service_title'>
                {service &&
                  TextAnimation(
                    'hpt_page.title.last_text',
                    'title_span_text',
                    service.title.last_title_text,
                    service.title_ar.last_title_text_ar,
                    null
                  )}
              </div>

              {window.localStorage.getItem('i18nextLng') &&
              window.localStorage.getItem('i18nextLng') === 'en' ? (
                <div className='title_arrow'>
                  <div className='arrow'>
                    <picture>
                      <img src={titleArrow} alt='Title Arrow' />
                    </picture>
                  </div>
                  <div className='service_sub_title'>
                    <div>
                      {service &&
                        TextAnimation(
                          'hpt_page.sub_title.first_text',
                          'sub_title_span_text',
                          service.sub_title.first_sub_title_text,
                          service.sub_title_ar.first_sub_title_text_ar,
                          null
                        )}
                    </div>
                    <div>
                      {service &&
                        TextAnimation(
                          'hpt_page.sub_title.last_text',
                          'sub_title_span_text',
                          service.sub_title.last_sub_title_text,
                          service.sub_title_ar.last_sub_title_text_ar,
                          null
                        )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='title_arrow'>
                  <div className='service_sub_title'>
                    <div>
                      {service &&
                        TextAnimation(
                          'hpt_page.sub_title.first_text',
                          'sub_title_span_text',
                          service.sub_title.first_sub_title_text,
                          service.sub_title_ar.first_sub_title_text_ar,
                          null
                        )}
                    </div>
                    <div>
                      {service &&
                        TextAnimation(
                          'hpt_page.sub_title.last_text',
                          'sub_title_span_text',
                          service.sub_title.last_sub_title_text,
                          service.sub_title_ar.last_sub_title_text_ar,
                          null
                        )}
                    </div>
                  </div>
                  <div className='arrow'>
                    <picture>
                      <img src={titleArrow} alt='Title Arrow' />
                    </picture>
                  </div>
                </div>
              )}
            </div>
          </div>
          <section className='cards'>
            {isAdmin ? (
              <div title={t('create.card')}>
                <CreateNewServiceCard />
              </div>
            ) : null}
            <Row>
              {servicesCard &&
                servicesCard.map((card, index) => (
                  <Col md={4} lg={3} key={index} className='card-col'>
                    {isAdmin ? (
                      <>
                        <div
                          className='item_delete_card_btn'
                          title={t('hpt_page.card.delete_btn', {
                            en: `Delete ${card.title}`,
                            ar: `حذف ${card.title_ar}`,
                          })}
                          onClick={() =>
                            RemoveItem('card', deleteCard, card._id, refetch)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} size='1x' />
                        </div>

                        <CreateServiceTab card_id={card._id} />

                        <EditServiceCard card={card} />
                      </>
                    ) : null}
                    <Card className='card_container'>
                      <Card.Img
                        src={card.card_image}
                        alt={t('hpt_page.card.title', {
                          en: card.title,
                          ar: card.title_ar,
                        })}
                        className='card_img_control'
                      />
                      <Card.Body>
                        <Card.Title
                          onClick={(e) => {
                            navigate(`view/${index}`);
                            dispatch(createServiceCard(card));
                          }}
                        >
                          {TextAnimation(
                            'hpt_page.card.title',
                            'card_title_span_text',
                            card.title,
                            card.title_ar,
                            null
                          )}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </section>
          <section className='service_footer'>
            <picture>
              <img
                src={service.footer_image}
                alt='Footer_Image.'
                className='w-100'
              />
            </picture>
            <Row className='service_footer_text'>
              <LinesAnimation />
              <Col md={8}>
                {service && (
                  <div className='footer_text_word'>
                    <div>
                      {TextAnimation(
                        'hpt_page.footer_text.first_text',
                        'footer_span_text',
                        service.footer_text.first_footer_text,
                        service.footer_text_ar.first_footer_text_ar,
                        null
                      )}
                    </div>
                    <div>
                      {TextAnimation(
                        'hpt_page.footer_text.last_text',
                        'footer_span_text',
                        service.footer_text.last_footer_text,
                        service.footer_text_ar.last_footer_text_ar,
                        null
                      )}
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </section>
        </>
      )}
    </section>
  );
};

export default HptServicesPage;
