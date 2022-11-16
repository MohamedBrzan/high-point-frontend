import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HptServices.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesLeft,
  faAnglesRight,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import TextAnimation from '../../../functions/TextAnimation';
import StyledButton from '../../../common/StyledButton/StyledButton';
import { useTranslation } from 'react-i18next';
import {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
} from '../../../store/apis/HptServices/HptServices';
import { useGetAllServicesCardQuery } from '../../../store/apis/ServicesCard/ServicesCard';
import { useNavigate } from 'react-router-dom';

const HptServices = () => {
  const { t, i18n } = useTranslation();
  const { data: allServices } = useGetAllServicesQuery();
  const { data: service, isSuccess: serviceCardIsSuccess } =
    useGetServiceByIdQuery(
      allServices && allServices[0] && allServices[0]._id
        ? allServices[0]._id
        : ''
    );
  const navigate = useNavigate();
  const { data: servicesCard, isSuccess } =
    useGetAllServicesCardQuery('length=3');
  useEffect(() => {
    if (servicesCard && isSuccess) {
      /*********** Card Buttons ******* */

      document.querySelectorAll('.hpt-services .card').forEach((btn) => {
        btn.onmouseenter = (e) => {
          e.target.lastElementChild.lastElementChild.firstElementChild.style.opacity =
            '1';

          e.target.lastElementChild.firstElementChild.lastElementChild.style.animation =
            '';
          setTimeout(() => {
            e.target.lastElementChild.firstElementChild.lastElementChild.style.animation =
              'bounceAlpha 0.3s linear alternate';
          }, 10);
        };

        btn.onmouseleave = (e) => {
          e.target.lastElementChild.firstElementChild.lastElementChild.style.animation =
            '';
          e.target.lastElementChild.lastElementChild.firstElementChild.style.opacity =
            '0.5';
          setTimeout(() => {
            e.target.lastElementChild.firstElementChild.lastElementChild.style.animation =
              'bounceAlpha 0.3s linear alternate-reverse';
          }, 10);
        };
      });
    }
  }, [isSuccess, servicesCard]);

  return (
    <section className='hpt-services'>
      {service && service._id ? (
        <>
          {' '}
          <Container fluid>
            <Row>
              <Col xs={12} md={6}>
                <div className='title'>
                  <span>
                    {service &&
                      TextAnimation(
                        'hpt_page.title.first_text',
                        'title_span_text',
                        service?.title?.first_title_text,
                        service?.title_ar?.first_title_text_ar,
                        null
                      )}
                  </span>
                  <span>
                    {service &&
                      TextAnimation(
                        'hpt_page.title.last_text',
                        'title_span_text',
                        service?.title?.last_title_text,
                        service?.title_ar?.last_title_text_ar,
                        null
                      )}
                  </span>
                </div>
              </Col>
              <Col xs={12} md={6} className='services-col-btn'>
                <StyledButton
                  goToLocation='/hpt-services'
                  color={'white'}
                  borderColor={'white'}
                  borderLeftColor={i18n.language === 'ar' ? 'white' : ''}
                  borderRightColor={i18n.language === 'en' ? 'white' : ''}
                >
                  {t('explore_btn')}
                </StyledButton>
              </Col>
            </Row>
          </Container>
          <hr className='services-head-hr' />
          <Container fluid className='services_container'>
            <Row className='m-0 p-0 align-items-center'>
              <Col md={4} className='services-text-col'>
                <div className='sub_title_text'>
                  <div>
                    {service &&
                      TextAnimation(
                        'hpt_page.title.first_text',
                        'sub_title_span_text',
                        service?.sub_title?.first_sub_title_text,
                        service?.sub_title_ar?.first_sub_title_text_ar,
                        null
                      )}
                  </div>
                  <div>
                    {service &&
                      TextAnimation(
                        'hpt_page.sub_title.last_text',
                        'sub_title_span_text',
                        service?.sub_title?.last_sub_title_text,
                        service?.sub_title_ar?.last_sub_title_text_ar,
                        null
                      )}
                  </div>
                </div>
              </Col>
              <Col className='services-big-text-col'>
                <div className='intro_text'>
                  {service &&
                    TextAnimation(
                      'hpt_page.sub_title.last_text',
                      'intro_span_text',
                      service?.intro_text,
                      service?.intro_text_ar,
                      null
                    )}
                </div>
              </Col>
            </Row>
            <Container fluid>
              <Row className='card-row'>
                {servicesCard && servicesCard.length > 0
                  ? servicesCard.map(
                      (
                        {
                          title,
                          title_ar,
                          description,
                          description_ar,
                          card_image,
                        },
                        index
                      ) => (
                        <Col
                          ss={12}
                          md={4}
                          key={index}
                          onClick={() => {
                            navigate(`/hpt-services/view/${index}`);
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            });
                          }}
                        >
                          <Card>
                            <Card.Img src={card_image} />
                            <Card.Body>
                              <Card.Title className='system'>
                                {TextAnimation(
                                  'hpt_page.sub_title.last_text',
                                  'title_span_text',
                                  title,
                                  title_ar,
                                  null
                                )}
                              </Card.Title>
                              <Card.Text>
                                {TextAnimation(
                                  'hpt_page.sub_title.last_text',
                                  'description_span_text',
                                  description,
                                  description_ar,
                                  null
                                )}
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                              <div className='card-btn'>
                                <div className='card-index'>{`0${
                                  index + 1
                                }`}</div>
                                <div className='card-arrow-icon'>
                                  <FontAwesomeIcon
                                    icon={
                                      i18n.language === 'en'
                                        ? faAnglesRight
                                        : faAnglesLeft
                                    }
                                    size='sm'
                                  />
                                </div>
                              </div>
                            </Card.Footer>
                          </Card>
                        </Col>
                      )
                    )
                  : null}
              </Row>
            </Container>
          </Container>
        </>
      ) : null}
    </section>
  );
};

export default HptServices;
