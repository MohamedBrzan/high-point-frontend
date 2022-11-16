import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { useGetAllServicesCardQuery } from '../../../store/apis/ServicesCard/ServicesCard';
import './ViewServices.css';
import { useDeleteServiceTabMutation } from '../../../store/apis/ServicesTabs/ServicesTabs';
import { useDeleteServiceSolutionMutation } from '../../../store/apis/ServicesSolutions/ServicesSolutions';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditServiceTab from '../CRUD_System/Edit/Tab/EditServiceTab';
import CreateServiceSolution from '../CRUD_System/Create/CreateSolution';
import { useLocation } from 'react-router-dom';
import EditServiceTabSolution from '../CRUD_System/Edit/TabSolution/TabSolution';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';
import { useSelector } from 'react-redux';
import RemoveForMoreThanId from '../../../functions/RemoveForMoreThanId';
import PageTitle from '../../../utils/PageTitle';

const ViewServices = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const location = useLocation();
  const activeIndex = location.pathname.split('/');

  const {
    data: servicesCard,
    isLoading,
    refetch,
  } = useGetAllServicesCardQuery();
  const [deleteTab] = useDeleteServiceTabMutation();
  const [deleteSolution] = useDeleteServiceSolutionMutation();

  const changeTitles = (e) => {
    const AllServicesTitles = document.querySelectorAll('.services_title');
    const AllServicesCard = document.querySelectorAll('.service_card');
    const AllTabs = document.querySelectorAll('.view-services .card_tab');
    const AllTabSolutions = document.querySelectorAll(
      '.view-services .tab_solutions .solutions'
    );

    AllTabs.forEach((service_card) => {
      service_card.classList.remove('active');
    });

    AllServicesTitles.forEach((services_title) => {
      services_title.classList.remove('active');
      AllServicesCard.forEach((service_card) => {
        service_card.classList.remove('active');
        if (
          service_card.getAttribute('data-card') ===
          e.target.getAttribute('data-title')
        ) {
          service_card.classList.add('active');
          const activeServiceCard = document.querySelector(
            '.service_card.active'
          ).lastChild;

          activeServiceCard.firstChild.classList.add('active');

          AllTabSolutions.forEach((solution) => {
            solution.classList.add('d-none');
            if (
              solution.getAttribute('data-solutions') ===
              activeServiceCard.firstChild.getAttribute('data-tab')
            ) {
              solution.classList.remove('d-none');
            }
          });
        }
      });
    });

    e.target.classList.add('active');
  };

  const changeTab = ({ e, tab_id }) => {
    const cardTab = document.querySelectorAll('.card_tab');
    const tabSolutions = document.querySelectorAll(
      '.tab_solutions [data-solutions]'
    );
    cardTab.forEach((card_tab) => card_tab.classList.remove('active'));

    tabSolutions.forEach((tab_solution) => {
      tab_solution.classList.add('d-none');
      if (tab_solution.getAttribute('data-solutions') === tab_id) {
        tab_solution.classList.remove('d-none');
      }
    });
    e.target.parentElement.classList.add('active');
  };

  const checkActiveTab = () => {
    const AllServicesTitles = document.querySelectorAll('.services_title');

    const AllServicesTabs = document.querySelectorAll(
      '.view-services .card_tab'
    );

    AllServicesTitles.forEach((services_title) =>
      services_title.classList.remove('active')
    );

    AllServicesTabs.forEach((tab) => tab.classList.remove('active'));

    return {
      AllServicesTitles,
      AllServicesTabs,
    };
  };

  useEffect(() => {
    const AllServicesTitles = Array.from(
      document.querySelectorAll('.services_title')
    );

    const AllServiceCard = document.querySelectorAll('.service_card');

    const AllServicesCard = Array.from(
      document.querySelectorAll('.view-services .service_card')
    );
    const AllTabs = Array.from(
      document.querySelectorAll('.view-services .card_tab')
    );
    const tabSolutions = document.querySelectorAll(
      '.tab_solutions [data-solutions]'
    );

    if (servicesCard && AllTabs) {
      tabSolutions.forEach((tab_solution) => {
        tab_solution.classList.add('d-none');
        if (
          tab_solution.getAttribute('data-solutions') ===
          AllTabs[0].getAttribute('data-tab')
        ) {
          tab_solution.classList.remove('d-none');
        }
      });
      AllServicesTitles[activeIndex[3]].classList.add('active');

      AllServiceCard.forEach((service_card) => {
        service_card.classList.remove('active');
      });

      AllServicesCard[activeIndex[3]].classList.add('active');
      const activeServiceCard = document.querySelector(
        '.service_card.active'
      ).lastChild;

      activeServiceCard.firstChild.classList.add('active');
    }
  }, [activeIndex, servicesCard]);

  if (isLoading) return <CustomSpinner />;

  return (
    <section className='view-services'>
      {' '}
      <PageTitle>View Services</PageTitle>
      <div className='section-head-image'></div>
      <Row className='main_row'>
        <Col xs={3}>
          <div className='titles_title'>{t('our_it_solution')}</div>

          {servicesCard &&
            servicesCard.map(({ _id, title, title_ar }, index) => (
              <div
                key={index}
                className='services_title'
                data-title={_id}
                onClick={(e) => changeTitles(e)}
              >
                {t('hpt_page.card.title', {
                  en: title,
                  ar: title_ar,
                })}
              </div>
            ))}
        </Col>
        <Col xs={9}>
          {servicesCard &&
            servicesCard.map(
              (
                {
                  _id: card_id,
                  title,
                  title_ar,
                  view_image,
                  image_text,
                  description,
                  description_ar,
                  tabs,
                },
                index
              ) => (
                <div key={index} className='service_card' data-card={card_id}>
                  <div className='title'>
                    {t('hpt_page.card.title', {
                      en: title,
                      ar: title_ar,
                    })}
                  </div>
                  <div className='view_image'>
                    <img src={view_image} alt='View.' />
                    <div className='image_text'>{image_text}</div>
                  </div>
                  <div className='description'>
                    {t('hpt_page.card.description', {
                      en: description,
                      ar: description_ar,
                    })}
                  </div>
                  <Row className='card_tabs'>
                    {tabs &&
                      tabs.map((tab, index) => (
                        <Col
                          xs={4}
                          key={index}
                          className='card_tab'
                          data-tab={tab._id}
                        >
                          {isAdmin ? (
                            <div className='d-flex justify-content-between'>
                              <div
                                className='action_btn edit_btn'
                                title={t('create.solution', {
                                  en: `Create ${tab.title}`,
                                  ar: `إنشاء ${tab.title_ar}`,
                                })}
                              >
                                <CreateServiceSolution tab_id={tab._id} />
                              </div>
                              <div
                                className='action_btn edit_btn'
                                title={t('hpt_page.card.edit_btn', {
                                  en: `Edit ${tab.title}`,
                                  ar: `تعديل ${tab.title_ar}`,
                                })}
                              >
                                <EditServiceTab tab={tab} />
                              </div>
                              <div
                                className='action_btn delete_btn'
                                title={t('hpt_page.card.delete_btn', {
                                  en: `Delete ${tab.title}`,
                                  ar: `حذف ${tab.title_ar}`,
                                })}
                                onClick={() => {
                                  const data = {
                                    card_id,
                                    tab_id: tab._id,
                                  };
                                  RemoveForMoreThanId(
                                    'tab',
                                    deleteTab,
                                    data,
                                    refetch,
                                    t
                                  );

                                  checkActiveTab();
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} size='2x' />
                              </div>
                            </div>
                          ) : null}
                          <div className='head_line'></div>
                          <div
                            className='title'
                            onClick={(e) => changeTab({ e, tab_id: tab._id })}
                          >
                            {t('hpt_page.card.tab.title', {
                              en: tab.title,
                              ar: tab.title_ar,
                            })}
                          </div>
                        </Col>
                      ))}
                    <div className='tab_solutions'>
                      {tabs &&
                        tabs.map(
                          ({ _id: tab_id, solutions }, index) =>
                            solutions &&
                            solutions.map((solution, index) => (
                              <div
                                className='solutions'
                                data-solutions={tab_id}
                                key={index}
                              >
                                <div className='content'>
                                  {index % 2 === 0 ? (
                                    <Row>
                                      {' '}
                                      <Col
                                        xs={12}
                                        md={6}
                                        className='description'
                                      >
                                        {' '}
                                        {isAdmin ? (
                                          <Row>
                                            {' '}
                                            <Col md={6}>
                                              {' '}
                                              <div
                                                className='action_btn delete_btn'
                                                title={t(
                                                  'hpt_page.card.delete_btn',
                                                  {
                                                    en: `Delete ${solution.title}`,
                                                    ar: `حذف ${solution.title_ar}`,
                                                  }
                                                )}
                                                onClick={() => {
                                                  const data = {
                                                    tab_id,
                                                    solution_id: solution._id,
                                                  };
                                                  RemoveForMoreThanId(
                                                    'solution',
                                                    deleteSolution,
                                                    data,
                                                    refetch,
                                                    t
                                                  );

                                                  checkActiveTab();
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faTrash}
                                                  size='2x'
                                                />
                                              </div>
                                            </Col>
                                            <Col md={6}>
                                              <EditServiceTabSolution
                                                solution={solution}
                                              />
                                            </Col>
                                          </Row>
                                        ) : null}
                                        <div className='title text-danger'>
                                          {t(
                                            'hpt_page.card.tab.solution.title',
                                            {
                                              en: solution.title,
                                              ar: solution.title_ar,
                                            }
                                          )}
                                        </div>
                                        {t(
                                          'hpt_page.card.tab.solution.description',
                                          {
                                            en: solution.description,
                                            ar: solution.description_ar,
                                          }
                                        )}
                                      </Col>
                                      <Col xs={12} md={6} className='img_col'>
                                        <img src={solution.image} alt='' />
                                      </Col>
                                    </Row>
                                  ) : (
                                    <Row>
                                      {' '}
                                      <Col xs={12} md={6} className='img_col'>
                                        <img src={solution.image} alt='' />
                                      </Col>{' '}
                                      <Col
                                        xs={12}
                                        md={6}
                                        className='description'
                                      >
                                        {isAdmin ? (
                                          <Row>
                                            {' '}
                                            <Col md={6}>
                                              {' '}
                                              <div
                                                className='action_btn delete_btn'
                                                title={t(
                                                  'hpt_page.card.delete_btn',
                                                  {
                                                    en: `Delete ${solution.title}`,
                                                    ar: `حذف ${solution.title_ar}`,
                                                  }
                                                )}
                                                onClick={() => {
                                                  const data = {
                                                    tab_id,
                                                    solution_id: solution._id,
                                                  };
                                                  RemoveForMoreThanId(
                                                    'solution',
                                                    deleteSolution,
                                                    data,
                                                    refetch,
                                                    t
                                                  );

                                                  checkActiveTab();
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faTrash}
                                                  size='2x'
                                                />
                                              </div>
                                            </Col>
                                            <Col md={6}>
                                              <EditServiceTabSolution
                                                solution={solution}
                                              />
                                            </Col>
                                          </Row>
                                        ) : null}
                                        <div className='title text-danger'>
                                          {t(
                                            'hpt_page.card.tab.solution.title',
                                            {
                                              en: title,
                                              ar: title_ar,
                                            }
                                          )}
                                        </div>
                                        {t(
                                          'hpt_page.card.tab.solution.description',
                                          {
                                            en: description,
                                            ar: description_ar,
                                          }
                                        )}
                                      </Col>
                                    </Row>
                                  )}
                                </div>
                              </div>
                            ))
                        )}
                    </div>
                  </Row>
                </div>
              )
            )}
        </Col>
      </Row>
    </section>
  );
};

export default ViewServices;
