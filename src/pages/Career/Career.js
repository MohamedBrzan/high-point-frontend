import { faAnglesDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import RemoveForMoreThanId from '../../functions/RemoveForMoreThanId';
import {
  useDeleteBriefMutation,
  useDeletePositionMutation,
  useGetAllCareersQuery,
  useGetCareerByIdQuery,
} from '../../store/apis/Career/Career';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import PageTitle from '../../utils/PageTitle';
import './Career.css';
import CreateBriefForm from './helpers/Brief/CreateBriefForm';
import EditBriefForm from './helpers/Brief/EditBriefForm';
import CreateCareerForm from './helpers/CreateCareerForm';
import EditCareerForm from './helpers/EditCareerForm';
import CreatePositionForm from './helpers/Position/CreatePosition';
import EditPositionForm from './helpers/Position/EditPositionForm';

const Career = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const { data: allCareers, isLoading, refetch } = useGetAllCareersQuery();

  const {
    data: career,
    isLoading: careerIsLoading,
    isSuccess: careerIsSuccess,
    refetch: refetchCareer,
  } = useGetCareerByIdQuery(
    allCareers && allCareers[0] && allCareers[0]._id ? allCareers[0]._id : null
  );

  const [deleteBrief] = useDeleteBriefMutation();

  const [deletePosition] = useDeletePositionMutation();

  useEffect(() => {
    if (careerIsSuccess && career.position.length > 0) {
      const allPositions = document.querySelectorAll(
        '.career .position_sec .position_container .position .head_content'
      );

      const allPositionsArrowIcon = document.querySelectorAll(
        '.career .position_sec .position_container .position .head_content .icon'
      );

      const allPositionsContent = document.querySelectorAll(
        '.career .position_sec .position_container .position .position_content'
      );

      allPositions.forEach((position) => {
        position.onclick = () => {
          allPositionsArrowIcon.forEach((icon) => {
            if (
              position.getAttribute('data-position') ===
              icon.getAttribute('data-icon')
            ) {
              icon.style.transform += 'rotate(180deg)';
            }
          });
          allPositionsContent.forEach((content) => {
            if (
              position.getAttribute('data-position') ===
              content.getAttribute('data-content')
            ) {
              content.classList.toggle('active');
            }
          });
        };
      });
    }
  }, [career?.position?.length, careerIsSuccess]);

  if (isLoading || careerIsLoading) return <CustomSpinner />;

  return (
    <section className='career'>
      {' '}
      <PageTitle>Career</PageTitle>
      {isAdmin ? !career ? <CreateCareerForm refetch={refetch} /> : null : null}
      {career ? (
        <>
          {isAdmin ? (
            <EditCareerForm career={career} refetchCareer={refetchCareer} />
          ) : null}
          <Container className='intro_container'>
            <div className='sec_name'>
              {t('hpt_page.career_page.name', {
                en: career.name,
                ar: career.name_ar,
              })}
            </div>
            <div className='head_text'>
              {t('hpt_page.career_page.head_text', {
                en: career.head_text.first_text,
                ar: career.head_text_ar.first_text_ar,
              })}
            </div>
            <div className='head_text'>
              {t('hpt_page.career_page.head_text', {
                en: career.head_text.middle_text,
                ar: career.head_text_ar.middle_text_ar,
              })}
            </div>
            <div className='head_text'>
              {t('hpt_page.career_page.head_text', {
                en: career.head_text.last_text,
                ar: career.head_text_ar.last_text_ar,
              })}
            </div>
            {isAdmin ? (
              <CreateBriefForm career={career} refetchCareer={refetchCareer} />
            ) : null}
            {career.brief ? (
              <div className='brief_sec'>
                {career.brief.map(
                  (
                    {
                      _id,
                      title,
                      title_ar,
                      description_one,
                      description_one_ar,
                      description_two,
                      description_two_ar,
                    },
                    index
                  ) => (
                    <div className='brief' key={index}>
                      {' '}
                      {isAdmin ? (
                        <div className='actions'>
                          <EditBriefForm
                            career={career}
                            brief={{
                              _id,
                              title,
                              title_ar,
                              description_one,
                              description_one_ar,
                              description_two,
                              description_two_ar,
                            }}
                            refetchCareer={refetchCareer}
                          />
                          <div
                            className='delete_btn'
                            onClick={() => {
                              const data = {
                                career_id: career._id,
                                brief_id: _id,
                              };
                              RemoveForMoreThanId(
                                'brief',
                                deleteBrief,
                                data,
                                refetchCareer
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} size='1x' />
                          </div>
                        </div>
                      ) : null}
                      <div className='brief_title'>
                        {t('hpt_page.career_page.brief.title', {
                          en: title,
                          ar: title_ar,
                        })}
                      </div>
                      <Row>
                        <Col md={6} className='brief_desc'>
                          {' '}
                          {t('hpt_page.career_page.brief.desc_one', {
                            en: description_one,
                            ar: description_one_ar,
                          })}
                        </Col>
                        <Col md={6} className='brief_desc'>
                          {' '}
                          {t('hpt_page.career_page.brief.desc_two', {
                            en: description_two,
                            ar: description_two_ar,
                          })}
                        </Col>
                      </Row>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </Container>
          {isAdmin ? (
            <CreatePositionForm career={career} refetchCareer={refetchCareer} />
          ) : null}
          {career.position ? (
            <div className='position_sec'>
              <div className='sec_title'>
                {' '}
                {t('hpt_page.career_page.position.name', {
                  en: 'Open Positions',
                  ar: 'المناصب المفتوحة',
                })}
              </div>
              <hr />
              {career.position.map(
                (
                  {
                    _id,
                    title,
                    title_ar,
                    sub_title,
                    sub_title_ar,
                    content,
                    content_ar,
                  },
                  index
                ) => (
                  <Container key={index} className='position_container'>
                    <div className='position'>
                      {isAdmin ? (
                        <div className='actions'>
                          <EditPositionForm
                            career={career}
                            position={{
                              _id,
                              title,
                              title_ar,
                              sub_title,
                              sub_title_ar,
                              content,
                              content_ar,
                            }}
                            refetchCareer={refetchCareer}
                          />
                          <div
                            className='delete_btn'
                            onClick={() => {
                              const data = {
                                career_id: career._id,
                                position_id: _id,
                              };
                              RemoveForMoreThanId(
                                'position',
                                deletePosition,
                                data,
                                refetchCareer
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} size='1x' />
                          </div>
                        </div>
                      ) : null}
                      <div className='head_content' data-position={index}>
                        <div className='content'>
                          <div className='title'>
                            {' '}
                            {t('hpt_page.career_page.position.title', {
                              en: title,
                              ar: title_ar,
                            })}
                          </div>
                          <p className='position_sub_title'>
                            {' '}
                            {t('hpt_page.career_page.position.sub_title', {
                              en: sub_title,
                              ar: sub_title_ar,
                            })}
                          </p>
                        </div>{' '}
                        <div className='icon' data-icon={index}>
                          <FontAwesomeIcon icon={faAnglesDown} size='2x' />
                        </div>
                      </div>

                      <p className='position_content' data-content={index}>
                        {' '}
                        {t('hpt_page.career_page.position.content', {
                          en: content,
                          ar: content_ar,
                        })}
                      </p>
                    </div>{' '}
                  </Container>
                )
              )}
            </div>
          ) : null}
          <div className='location_sec'>
            <div className='sec_title'>
              {' '}
              {t('hpt_page.career_page.location.title', {
                en: career.location_info?.title,
                ar: career.location_info?.title_ar,
              })}
            </div>
            <hr />
            <Container className='location_container'>
              <div className='location_description'>
                {' '}
                {t('hpt_page.career_page.location.description', {
                  en: career.location_info?.description,
                  ar: career.location_info?.description_ar,
                })}
              </div>{' '}
              <div className='image_container'>
                <picture>
                  <img
                    src={career.location_info?.image}
                    alt='LOCATION_IMAGE'
                    className='location_img'
                  />
                </picture>
              </div>
            </Container>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Career;
