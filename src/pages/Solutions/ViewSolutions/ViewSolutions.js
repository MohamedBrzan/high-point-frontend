import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditSolutionTab from '../CRUD_System/Edit/Tab/EditSolutionTab';
import CreateSolutionSolution from '../CRUD_System/Create/CreateSolution';
import { useGetAllSolutionsCardQuery } from '../../../store/apis/SolutionsCard/SolutionsCard';
import { useDeleteSolutionTabMutation } from '../../../store/apis/SolutionsTabs/SolutionsTabs';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';
import { useDeleteSolutionSolutionMutation } from '../../../store/apis/SolutionsSolutions/SolutionsSolutions';
import EditSolutionTabSolution from '../../Solutions/CRUD_System/Edit/TabSolution/TabSolution';
import './ViewSolutions.css';
import { useSelector } from 'react-redux';
import RemoveItem from '../../../functions/RemoveItem';
import RemoveForMoreThanId from '../../../functions/RemoveForMoreThanId';
import PageTitle from '../../../utils/PageTitle';

const ViewSolutions = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const {
    data: solutionsCard,
    isLoading,
    refetch,
  } = useGetAllSolutionsCardQuery();
  const [deleteTab] = useDeleteSolutionTabMutation();
  const [deleteSolution] = useDeleteSolutionSolutionMutation();
  const location = useLocation();
  const activeIndex = location.pathname.split('/');

  const changeTitles = (e) => {
    const AllSolutionsTitles = document.querySelectorAll('.solutions_title');
    const AllSolutionsCard = document.querySelectorAll('.solution_card');
    const AllTabs = document.querySelectorAll('.view-solutions .card_tab');
    const AllTabSolutions = document.querySelectorAll(
      '.view-solutions .tab_solutions .solutions'
    );

    AllTabs.forEach((solution_card) => {
      solution_card.classList.remove('active');
    });

    AllSolutionsTitles.forEach((solutions_title) => {
      solutions_title.classList.remove('active');
      AllSolutionsCard.forEach((solution_card) => {
        solution_card.classList.remove('active');
        if (
          solution_card.getAttribute('data-card') ===
          e.target.getAttribute('data-title')
        ) {
          solution_card.classList.add('active');
          const activeSolutionCard = document.querySelector(
            '.solution_card.active'
          ).lastChild;

          activeSolutionCard.firstChild.classList.add('active');

          AllTabSolutions.forEach((solution) => {
            solution.classList.add('d-none');
            if (
              solution.getAttribute('data-solutions') ===
              activeSolutionCard.firstChild.getAttribute('data-tab')
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
    const AllSolutionsTitles = document.querySelectorAll(
      '.view-solutions .solutions_title'
    );
    const AllSolutionsTabs = document.querySelectorAll(
      '.view-solutions .card_tab'
    );

    AllSolutionsTitles.forEach((solutions_title) =>
      solutions_title.classList.remove('active')
    );
    AllSolutionsTabs.forEach((tab) => tab.classList.remove('active'));

    return {
      AllSolutionsTitles,
      AllSolutionsTabs,
    };
  };

  useEffect(() => {
    const AllSolutionsTitles = Array.from(
      document.querySelectorAll('.solutions_title')
    );

    const AllSolutionCard = document.querySelectorAll(
      '.view-solutions .solution_card'
    );

    const AllSolutionsCard = Array.from(
      document.querySelectorAll('.view-solutions .solution_card')
    );
    const AllCards = Array.from(
      document.querySelectorAll('.view-solutions .card_tab')
    );
    const tabSolutions = document.querySelectorAll(
      '.tab_solutions [data-solutions]'
    );

    if (solutionsCard && AllCards) {
      tabSolutions.forEach((tab_solution) => {
        tab_solution.classList.add('d-none');
        if (
          tab_solution.getAttribute('data-solutions') ===
          AllCards[0].getAttribute('data-tab')
        ) {
          tab_solution.classList.remove('d-none');
        }
      });
      AllSolutionsTitles[activeIndex[3]].classList.add('active');

      AllSolutionCard.forEach((solution_card) => {
        solution_card.classList.remove('active');
        solution_card.style.setProperty('--right', 0);
      });
      AllSolutionsCard[activeIndex[3]].classList.add('active');
      const activeSolutionCard = document.querySelector(
        '.view-solutions .solution_card.active'
      ).lastChild;

      activeSolutionCard.firstChild.classList.add('active');
    }
  }, [activeIndex, solutionsCard]);

  if (isLoading) return <CustomSpinner />;

  return (
    <section className='view-solutions'>
      {' '}
      <PageTitle>View Solutions</PageTitle>
      <div className='section-head-image'></div>
      <Row className='main_row'>
        <Col xs={3}>
          <div className='titles_title'>{t('our_it_solution')}</div>

          {solutionsCard &&
            solutionsCard.map(({ _id, title, title_ar }, index) => (
              <div
                key={index}
                className='solutions_title'
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
          {solutionsCard &&
            solutionsCard.map(
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
                <div key={index} className='solution_card' data-card={card_id}>
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
                                <CreateSolutionSolution tab_id={tab._id} />
                              </div>
                              <div
                                className='action_btn edit_btn'
                                title={t('hpt_page.card.edit_btn', {
                                  en: `Edit ${tab.title}`,
                                  ar: `تعديل ${tab.title_ar}`,
                                })}
                              >
                                <EditSolutionTab tab={tab} />
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
                                        {isAdmin ? (
                                          <Row>
                                            <Col md={6}>
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
                                              <EditSolutionTabSolution
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
                                              <EditSolutionTabSolution
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

export default ViewSolutions;
