import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cloud from '../../../images/cloud.svg';
import LinesAnimation from '../../../anim/LinesAnimation/LinesAnimation';
import StyledButton from '../../../common/StyledButton/StyledButton';
import { useTranslation } from 'react-i18next';
import './About.css';
import CreateDevelopmentForm from './helpers/CreateDevelopmentForm';
import EditDevelopmentForm from './helpers/EditDevelopmentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TextAnimation from '../../../functions/TextAnimation';
import { useDeleteDevelopmentMutation } from '../../../store/apis/Interface/Interface';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const About = ({ refetchInterface, interface_id, about }) => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const [deleteDevelopment] = useDeleteDevelopmentMutation();

  const removeDevelopment = async (development_id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const checkIfTrue = confirm(t('delete.delete_development_confirm'));

      if (checkIfTrue === true) {
        await deleteDevelopment({ interface_id, development_id }).then(
          (response) => {
            if (response.data) {
              toast.success(t('delete.item_success'), {
                position: 'top-center',
              });
              refetchInterface();
            } else {
              toast.error(t(response.error.data.message), {
                position: 'top-center',
              });
            }
          }
        );
      } else {
        return;
      }
    } catch (error) {
      return toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  return (
    <section className='about_component'>
      <Container fluid>
        <Row className='justify-content-between align-items-center'>
          <Col md={6}>
            <span className='number pe-2'>
              {TextAnimation(null, 'number_span_text', null, null, '01')}
            </span>
            <span className='title'>
              {about
                ? TextAnimation(
                    'hpt_page.interface_page.about.name',
                    'about_span_text',
                    about.name,
                    about.name_ar
                  )
                : null}
            </span>
          </Col>
          <Col md={6} className='about-col-btn'>
            <StyledButton
              goToLocation='/about'
              borderLeftColor={i18n.language === 'ar' && '#2b028d'}
              borderRightColor={i18n.language === 'en' && '#2b028d'}
            >
              {t('explore_btn')}
            </StyledButton>
          </Col>
        </Row>
        <hr className='about-head-hr' />

        <Row className='m-0 p-0 align-items-center'>
          <Col md={4} className='about-wrapper'>
            <img src={cloud} alt='Cloud.' className='cloud-svg' />
            <LinesAnimation />
          </Col>
          <Col className='about-big-text-col'>
            <div className='text'>
              {about
                ? TextAnimation(
                    'hpt_page.interface_page.about.name',
                    'title_span_text',
                    about.title,
                    about.title_ar
                  )
                : null}
            </div>
            <Row>
              <Col xs={12} md={6} className='text-col'>
                <span className='text-danger'>
                  {' '}
                  {about
                    ? TextAnimation(
                        'hpt_page.interface_page.about.name',
                        'description-span_text',
                        about.description_one.marked_text,
                        about.description_one_ar.marked_text_ar,
                        null
                      )
                    : null}
                </span>{' '}
                {about
                  ? TextAnimation(
                      'hpt_page.interface_page.about.name',
                      'description-span_text',
                      about.description_one.normal_text,
                      about.description_one_ar.normal_text_ar,
                      null
                    )
                  : null}
              </Col>
              <Col xs={12} md={6} className='text-col'>
                <span className='text-danger'>
                  {' '}
                  {about
                    ? TextAnimation(
                        'hpt_page.interface_page.about.name',
                        'description-span_text',
                        about.description_two.marked_text,
                        about.description_two_ar.marked_text_ar,
                        null
                      )
                    : null}
                </span>{' '}
                {about
                  ? TextAnimation(
                      'hpt_page.interface_page.about.name',
                      'description-span_text',
                      about.description_two.normal_text,
                      about.description_two_ar.normal_text_ar,
                      null
                    )
                  : null}
              </Col>
            </Row>
            <Row className='analytics'>
              {isAdmin ? (
                <CreateDevelopmentForm
                  refetchInterface={refetchInterface}
                  interface_id={interface_id}
                />
              ) : null}
              {about?.developments?.length > 0
                ? about?.developments?.map(
                    ({ _id, field, field_ar, progress }, index) => (
                      <Col md={4} key={index}>
                        {isAdmin ? (
                          <div className='actions_btn'>
                            <EditDevelopmentForm
                              development_id={_id}
                              development={{ field, field_ar, progress }}
                              refetchInterface={refetchInterface}
                              interface_id={interface_id}
                            />
                            <div
                              className='delete_btn'
                              onClick={() => removeDevelopment(_id)}
                            >
                              <FontAwesomeIcon icon={faTrash} size='1x' />
                            </div>
                          </div>
                        ) : null}
                        <div className='number'>{progress}+</div>
                        <div className='text'>
                          {t('hpt_page.interface_page.about.name', {
                            en: field,
                            ar: field_ar,
                          })}
                        </div>
                      </Col>
                    )
                  )
                : null}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
