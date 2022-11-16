import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  useDeleteAnswerMutation,
  useDeleteCrewMutation,
  useDeleteMissionMutation,
  useGetAboutByIdQuery,
  useGetAllAboutQuery,
} from '../../store/apis/About/About';
import LinesAnimation from '../../anim/LinesAnimation/LinesAnimation';
import arrow from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import './About.css';
import { useEffect } from 'react';
import CreateAboutForm from './helpers/CreateAboutForm';
import EditAboutForm from './helpers/EditAboutForm';
import CreateAnswerForm from './helpers/Answer/CreateAnswerForm';
import EditAnswerForm from './helpers/Answer/EditAnswerForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateCrewForm from './helpers/Crew/CreateCrewForm';
import EditCrewForm from './helpers/Crew/EditCrewForm';
import CreateMissionForm from './helpers/Mission/CreateMissionForm';
import EditMissionForm from './helpers/Mission/EditMissionForm';
import StyledButton from '../../common/StyledButton/StyledButton';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import LetterAnimation from '../../functions/LetterAnimation';
import CleanAnimation from '../../functions/CleanAnimation';
import { useSelector } from 'react-redux';
import TextAnimation from '../../functions/TextAnimation';
// import NuclearAnimation from '../../anim/NuclearAnimation/NuclearAnimation';
import RemoveForMoreThanId from '../../functions/RemoveForMoreThanId';
import PageTitle from '../../utils/PageTitle';

const About = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const { data: allAbout, isLoading, refetch } = useGetAllAboutQuery();

  const {
    data: about,
    isLoading: aboutLoading,
    refetch: refetchAbout,
  } = useGetAboutByIdQuery(
    allAbout && allAbout[0] && allAbout[0]._id ? allAbout[0]._id : ''
  );
  const [deleteMission, { isLoading: deletingMission }] =
    useDeleteMissionMutation();

  const [deleteAnswer, { isLoading: deleting }] = useDeleteAnswerMutation();

  const [deleteCrew, { isLoading: deletingMember }] = useDeleteCrewMutation();

  useEffect(() => {
    const footerText = document.querySelectorAll(
      '.about .about_footer .about_footer_text .footer_text_word span.footer_span_text'
    );

    window.onscroll = () => {
      if (footerText) {
        if (window.scrollY >= 1000) {
          LetterAnimation(footerText);
        } else {
          CleanAnimation(footerText);
        }
      }
    };
  }, []);

  if (
    isLoading ||
    aboutLoading ||
    deleting ||
    deletingMember ||
    deletingMission
  )
    return <CustomSpinner />;

  return (
    <section className='about'>
      <PageTitle>About</PageTitle>
      <div className='section-head-image'></div>
      {/* <div className='nuclear_canvas_container'>{NuclearAnimation()}</div> */}
      {isAdmin ? (
        about && about._id ? (
          <EditAboutForm about={about} refetchAbout={refetchAbout} />
        ) : (
          <CreateAboutForm refetch={refetch} />
        )
      ) : null}
      {about && about._id && (
        <>
          <Row className='main__row about'>
            <Col md={3} className='anime_col'>
              <LinesAnimation />
            </Col>
            <Col md={5}>
              <div className='about__container'>
                <div className='about__row'>
                  <div>
                    <div className='about__title'>
                      {t('hpt_page.about_page.title', {
                        en: about.title,
                        ar: about.title_ar,
                      })}
                    </div>
                    <div className='about__description'>
                      {t('hpt_page.about_page.description', {
                        en: about.description,
                        ar: about.description_ar,
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className='missions__container'>
                {isAdmin ? (
                  <CreateMissionForm
                    about={about}
                    refetchAbout={refetchAbout}
                  />
                ) : null}
                <Row className='missions__row'>
                  {about.missions &&
                    about.missions.map((mission, index) => (
                      <Col md={6} className='my-2' key={index}>
                        {isAdmin ? (
                          <div className='actions'>
                            <EditMissionForm
                              about={about}
                              mission={mission}
                              refetchAbout={refetchAbout}
                            />

                            <div
                              className='delete_btn'
                              onClick={(e) => {
                                const data = {
                                  about_id: about._id,
                                  mission_id: mission._id,
                                };
                                RemoveForMoreThanId(
                                  'mission',
                                  deleteMission,
                                  data,
                                  refetchAbout
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} size='1x' />
                            </div>
                          </div>
                        ) : null}
                        {index === 0 && (
                          <div className='missions_title'>
                            {t('hpt_page.about_page.description', {
                              en: 'Our Missions',
                              ar: 'مهمتنا',
                            })}
                          </div>
                        )}
                        {index === 1 && (
                          <div className='missions_title'>
                            {t('hpt_page.about_page.description', {
                              en: 'Our Missions',
                              ar: 'مهمتنا',
                            })}
                          </div>
                        )}
                        <div className='mission__title'>
                          {t('hpt_page.about_page.title', {
                            en: mission.mission_title,
                            ar: mission.mission_title_ar,
                          })}
                        </div>
                        <div className='mission__description'>
                          {t('hpt_page.about_page.description', {
                            en: mission.mission_description,
                            ar: mission.mission_description_ar,
                          })}
                        </div>
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
          <Row className='main__row'>
            <Col md={3} className='anime_col'></Col>
            <Col md={9}>
              <div className='q_a__container'>
                <Row className='q_a__row'>
                  {isAdmin ? (
                    <CreateAnswerForm
                      about={about}
                      refetchAbout={refetchAbout}
                    />
                  ) : null}
                  {about.q_a && (
                    <div className='q_a__title'>
                      {t('hpt_page.about_page.title', {
                        en: `${about.q_a.q_a_title} ?`,
                        ar: `${about.q_a.q_a_title_ar} ?`,
                      })}
                      <br />
                      {i18n.language === 'en' ? (
                        <img
                          src={arrow}
                          alt='Arrow'
                          className='q_a_arrow_img'
                        />
                      ) : (
                        <img
                          src={arrowAr}
                          alt='Arrow'
                          className='q_a_arrow_img'
                        />
                      )}
                    </div>
                  )}

                  {about.q_a &&
                    about.q_a.answers &&
                    about.q_a.answers.map((answer, index) => (
                      <Col md={6} className='answer mb-3' key={index}>
                        {isAdmin ? (
                          <div className='actions'>
                            <EditAnswerForm
                              about={about}
                              answer={answer}
                              refetchAbout={refetchAbout}
                            />

                            <div
                              className='delete_btn'
                              onClick={(e) => {
                                const data = {
                                  about_id: about._id,
                                  answer_id: answer._id,
                                };
                                RemoveForMoreThanId(
                                  'answer',
                                  deleteAnswer,
                                  data,
                                  refetchAbout
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} size='1x' />
                            </div>
                          </div>
                        ) : null}
                        {t('hpt_page.about_page.title', {
                          en: answer.text,
                          ar: answer.text_ar,
                        })}
                      </Col>
                    ))}
                </Row>
              </div>
            </Col>
          </Row>
          {about.team && (
            <div className='teams__container'>
              {isAdmin ? (
                <CreateCrewForm about={about} refetchAbout={refetchAbout} />
              ) : null}
              <div className='mb-3'>
                {t('hpt_page.about_page.title', {
                  en: about.team.team_title,
                  ar: about.team.team_title_ar,
                })}
              </div>
              <hr />

              {about.team &&
                about.team.crew &&
                about.team.crew.map((crew, index) => (
                  <Row className='teams__row' key={index}>
                    {isAdmin ? (
                      <div className='actions'>
                        <EditCrewForm
                          about={about}
                          crew={crew}
                          refetchAbout={refetchAbout}
                        />

                        <div
                          className='delete_btn'
                          onClick={(e) => {
                            const data = {
                              about_id: about._id,
                              crew_id: crew._id,
                            };
                            RemoveForMoreThanId(
                              'crew',
                              deleteCrew,
                              data,
                              refetchAbout
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} size='1x' />
                        </div>
                      </div>
                    ) : null}
                    <Col md={6} className='image'>
                      <picture>
                        <img src={crew.image} alt='' className='w-100' />
                      </picture>
                    </Col>
                    <Col md={6}>
                      <div className='job_title'>
                        {t('hpt_page.about_page.title', {
                          en: crew.job_title,
                          ar: crew.job_title_ar,
                        })}
                      </div>
                      <div className='name'>
                        {t('hpt_page.about_page.title', {
                          en: crew.name,
                          ar: crew.name_ar,
                        })}
                      </div>
                      <div className='bio'>
                        {t('hpt_page.about_page.title', {
                          en: crew.bio,
                          ar: crew.bio_ar,
                        })}
                      </div>
                    </Col>
                  </Row>
                ))}
            </div>
          )}
          <section className='about_footer'>
            <picture>
              <img
                src={about.footer_image}
                alt='About Footer Img.'
                className='w-100'
              />
            </picture>
            <Row className='about_footer_text'>
              <LinesAnimation />
              <Col md={8}>
                {about && (
                  <div className='footer_text_word'>
                    <div>
                      {TextAnimation(
                        'hpt_page.about_page.title',
                        'footer_span_text',
                        about.footer_text,
                        about.footer_text_ar,
                        null
                      )}
                    </div>
                    <div className='btn'>
                      <StyledButton color={'white'}>
                        {t('hpt_page.about_page.title', {
                          en: 'Get In Touch',
                          ar: 'إبقى على تواصل',
                        })}
                      </StyledButton>
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

export default About;
