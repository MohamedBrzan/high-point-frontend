import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StyledButton from '../../../common/StyledButton/StyledButton';
import './Partners.css';
import { useTranslation } from 'react-i18next';
import { useGetAllPartnersQuery } from '../../../store/apis/Partner/Partner';
import TextAnimation from '../../../functions/TextAnimation';

const Partners = ({ partner }) => {
  const { t, i18n } = useTranslation();
  const { data: partners } = useGetAllPartnersQuery();

  return (
    <section className='partner_component'>
      <Container fluid className='intro-section'>
        <Row className='justify-content-between align-items-center'>
          <Col className='head_text'>
            <span className='number pe-2'>
              {TextAnimation(null, 'number_span_text', null, null, '03')}
            </span>
            <span className='title'>
              {partner && partner.name
                ? TextAnimation(
                    'hpt_page.interface_page.partner.name',
                    'partner_span_text',
                    partner.name,
                    partner.name_ar
                  )
                : null}
            </span>
          </Col>
          <Col className='partners-col-btn'>
            <StyledButton
              goToLocation='/partners'
              borderLeftColor={i18n.language === 'ar' && '#2b028d'}
              borderRightColor={i18n.language === 'en' && '#2b028d'}
            >
              {t('explore_btn')}
            </StyledButton>
          </Col>
        </Row>
        <hr className='partners-head-hr' />
        <Row className='partners-big-text-col'>
          <Col md={2} className='partners-wrapper'></Col>
          <Col xs={12} md={8}>
            <div className='partner_title'>
              <div className='text'>
                {partner && partner.title
                  ? TextAnimation(
                      'hpt_page.interface_page.partner.name',
                      'title_span_text',
                      partner.title.first_text,
                      partner.title_ar.first_text_ar
                    )
                  : null}
              </div>{' '}
              <div className='text'>
                {partner && partner.title
                  ? TextAnimation(
                      'hpt_page.interface_page.partner.name',
                      'title_span_text',
                      partner.title.last_text,
                      partner.title_ar.last_text_ar
                    )
                  : null}
              </div>
            </div>
            <Row className='official_partners'>
              {partners
                ? partners.map(({ image, name, name_ar }, index) => (
                    <Col md={3} key={index}>
                      <picture>
                        <img
                          src={image}
                          alt='PARTNER_IMG'
                          className='partner_image'
                        />
                      </picture>
                    </Col>
                  ))
                : null}
            </Row>

            <Row>
              <Col md={2}>
                <img
                  src={partner.image}
                  alt='PARTNER_IMAGE.'
                  className='partner-img'
                />
              </Col>{' '}
              <Col md={6} className='description'>
                {partner && partner.description
                  ? TextAnimation(
                      'hpt_page.interface_page.partner.name',
                      'description_span_text',
                      partner.description,
                      partner.description_ar
                    )
                  : null}
              </Col>
            </Row>
          </Col>
        </Row>{' '}
      </Container>
    </section>
  );
};

export default Partners;
