import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../../images/logo.png';
import StyledButton from '../../../common/StyledButton/StyledButton';
import './Solutions.css';
import { useTranslation } from 'react-i18next';
import { ControlBar, Player } from 'video-react';
import '/node_modules/video-react/dist/video-react.css'; // import css
import CreateSolutionForm from './helpers/CreateSolutionForm';
import TextAnimation from '../../../functions/TextAnimation';
import EditSolutionForm from './helpers/EditSolutionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteSolutionMutation } from '../../../store/apis/Interface/Interface';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Solutions = ({ interface_id, refetchInterface, solutions }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const [deleteSolution] = useDeleteSolutionMutation();

  const removeSolution = async (solution_id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const checkIfTrue = confirm(t('delete.delete_solution_confirm'));

      if (checkIfTrue === true) {
        await deleteSolution({ interface_id, solution_id }).then((response) => {
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
        });
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
    <section className='solutions'>
      {isAdmin ? (
        <CreateSolutionForm
          interface_id={interface_id}
          refetchInterface={refetchInterface}
        />
      ) : null}
      <Row>
        <Col md={5}> </Col>
        <Col md={7}>
          {' '}
          <Container className='provides'>
            <div className='title'>
              <div className='text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'title_span_text',
                      solutions.title_text?.first_text,
                      solutions.title_text_ar?.first_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'title_span_text',
                      solutions.title_text?.second_text,
                      solutions.title_text_ar?.second_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'title_span_text',
                      solutions.title_text?.third_text,
                      solutions.title_text_ar?.third_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'title_span_text',
                      solutions.title_text?.last_text,
                      solutions.title_text_ar?.last_text_ar,
                      null
                    )
                  : null}
              </div>
            </div>
            <div className='sub_title'>
              <p className='my-5'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'title_span_text',
                      solutions.sub_title_text?.first_text,
                      solutions.sub_title_text_ar?.first_text_ar,
                      null
                    )
                  : null}
              </p>
              <p className='my-5'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'title_span_text',
                      solutions.sub_title_text?.last_text,
                      solutions.sub_title_text_ar?.last_text_ar,
                      null
                    )
                  : null}
              </p>
            </div>
          </Container>
          {solutions && solutions.solution && solutions.solution.length > 0
            ? solutions.solution.map(
                (
                  {
                    _id,
                    title,
                    title_ar,
                    description,
                    description_ar,
                    solution_image,
                    anime_image,
                  },
                  index
                ) => (
                  <Row className='provide-row' key={index}>
                    {isAdmin ? (
                      <div className='actions_btn'>
                        <EditSolutionForm
                          interface_id={interface_id}
                          solution={{
                            _id,
                            title,
                            title_ar,
                            description,
                            description_ar,
                            solution_image,
                            anime_image,
                          }}
                          refetchInterface={refetchInterface}
                        />
                        <div
                          className='delete_btn'
                          onClick={() => removeSolution(_id)}
                        >
                          <FontAwesomeIcon icon={faTrash} size='1x' />
                        </div>
                      </div>
                    ) : null}
                    <Col xs={2} className='img-col'>
                      <img
                        src={solution_image}
                        alt='solution_image.'
                        className='solution_img'
                      />

                      <img
                        src={anime_image}
                        alt='anime_image.'
                        className='anime_img'
                      />
                      <div className='col_modal'></div>
                    </Col>
                    <Col xs={12} md={10} className='content-col'>
                      <h4>
                        {t('hpt_page.interface_page.solutions.name', {
                          en: title,
                          ar: title_ar,
                        })}
                      </h4>
                      <p className='description'>
                        <small>
                          {t('hpt_page.interface_page.solutions.name', {
                            en: description,
                            ar: description_ar,
                          })}
                        </small>
                      </p>
                    </Col>
                  </Row>
                )
              )
            : null}
        </Col>
      </Row>
      <Container fluid className='AI-img-container my-5'>
        <div className='AI_img_or_video'>
          {solutions && solutions.image ? (
            <picture>
              <img src={solutions.image} alt='AI.' className='AI-img' />
            </picture>
          ) : null}

          {solutions && solutions.video ? (
            <div className='video_container my-3'>
              <div className='video_modal'></div>
              <Player
                muted
                fluid
                autoPlay
                playsInline
                poster={logo}
                src={solutions?.video}
              >
                <ControlBar autoHide disableDefaultControls />
              </Player>
            </div>
          ) : null}
        </div>

        <div className='AI-content'>
          <div className='content'>
            <div>
              <div className='footer_text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'footer_span_text',
                      solutions.footer_text.first_text,
                      solutions.footer_text_ar.first_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='footer_text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'footer_span_text',
                      solutions.footer_text.second_text,
                      solutions.footer_text_ar.second_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='footer_text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'footer_span_text',
                      solutions.footer_text.third_text,
                      solutions.footer_text_ar.third_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='footer_text'>
                {solutions
                  ? TextAnimation(
                      'hpt_page.interface_page.solutions.name',
                      'footer_span_text',
                      solutions.footer_text.last_text,
                      solutions.footer_text_ar.last_text_ar,
                      null
                    )
                  : null}
              </div>
              <Link
                to='/about'
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
                className='text-decoration-none'
              >
                <StyledButton
                  margin='0'
                  color='white'
                  borderColor='white'
                  borderRightColor='white'
                >
                  {t('about_hpt_btn')}
                </StyledButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Solutions;
