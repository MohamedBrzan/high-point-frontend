import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
import LinesAnimation from '../../../anim/LinesAnimation/LinesAnimation';
import {
  useGetAllSolutionsQuery,
  useGetSolutionByIdQuery,
} from '../../../store/apis/HptSolutions/HptSolutions';
import titleArrow from '../../../images/title_arrow.svg';
import './HptSolutionsPage.css';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteSolutionCardMutation,
  useGetAllSolutionsCardQuery,
} from '../../../store/apis/SolutionsCard/SolutionsCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import { createSolutionCard } from '../../../store/reducers/solutions/Card';
import { useDispatch, useSelector } from 'react-redux';
import EditSolution from '../CRUD_System/Edit/Solutions/EditSolution';
import EditSolutionCard from '../CRUD_System/Edit/Card/EditSolutionCard';
import CreateSolutionTab from '../CRUD_System/Create/CreateTab';
import CreateNewSolutionCard from '../CRUD_System/Create/CreateCard';
import TextAnimation from '../../../functions/TextAnimation';
import { useEffect } from 'react';
import LetterAnimation from '../../../functions/LetterAnimation';
import CleanAnimation from '../../../functions/CleanAnimation';
// import NuclearAnimation from '../../../anim/NuclearAnimation/NuclearAnimation';
import RemoveItem from '../../../functions/RemoveItem';
import PageTitle from '../../../utils/PageTitle';

const HptSolutionsPage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: allSolutions,
    isSuccess,
    isLoading,
  } = useGetAllSolutionsQuery();
  const { data: solution, isLoading: solutionIsLoading } =
    useGetSolutionByIdQuery(
      isSuccess && allSolutions && allSolutions[0] && allSolutions[0]._id
        ? allSolutions[0]._id
        : null
    );
  const {
    data: solutionsCard,
    isLoading: solutionsCardIsLoading,
    refetch,
  } = useGetAllSolutionsCardQuery();

  const [deleteCard] = useDeleteSolutionCardMutation();

  useEffect(() => {
    window.onscroll = () => {
      if (solution && solution._id) {
        const titleText = document.querySelectorAll(
          '.hpt-solutions-page span.title_span_text'
        );

        const cardTitleText = document.querySelectorAll(
          '.hpt-solutions-page span.card_title_span_text'
        );

        const footerText = document.querySelectorAll(
          '.hpt-solutions-page span.footer_span_text'
        );
        if (titleText) {
          if (window.scrollY >= 300) {
            LetterAnimation(titleText);
          } else {
            CleanAnimation(titleText);
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
      }
    };

    const headTextSpan = document.querySelectorAll(
      '.hpt-solutions-page .header_text span.head_span_text'
    );

    const introColoredText = document.querySelectorAll(
      '.hpt-solutions-page .intro_text span.intro_span_text'
    );

    if (headTextSpan) {
      LetterAnimation(headTextSpan);
    }
    if (introColoredText) {
      LetterAnimation(introColoredText);
    }
  }, [solution]);

  if (isLoading) return <Spinner />;
  return (
    <section className='hpt-solutions-page'>
      <PageTitle>Hpt Solutions</PageTitle>
      <div className='section-head-image'></div>
      {/* <div className='nuclear_canvas_container'>{NuclearAnimation()}</div> */}
      {isAdmin ? <EditSolution /> : null}
      {solution && solution._id && (
        <>
          <Row className='solution_row'>
            <Col md={8} className='solution_text'>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.first_text',
                  'head_span_text',
                  solution.header_text.first_text,
                  solution.header_text_ar.first_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.second_text',
                  'head_span_text',
                  solution.header_text.second_text,
                  solution.header_text_ar.second_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.third_text',
                  'head_span_text',
                  solution.header_text.third_text,
                  solution.header_text_ar.third_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.fourth_text',
                  'head_span_text',
                  solution.header_text.fourth_text,
                  solution.header_text_ar.fourth_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.fifth_text',
                  'head_span_text',
                  solution.header_text.fifth_text,
                  solution.header_text_ar.fifth_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.sixth_text',
                  'head_span_text',
                  solution.header_text.sixth_text,
                  solution.header_text_ar.sixth_text_ar,
                  null
                )}
              </div>
              <div className='header_text'>
                {TextAnimation(
                  'hpt_page.header_text.seventh_text',
                  'head_span_text',
                  solution.header_text.seventh_text,
                  solution.header_text_ar.seventh_text_ar,
                  null
                )}
              </div>
              <div className='intro_text'>
                {TextAnimation(
                  'hpt_page.intro_text',
                  'intro_span_text',
                  solution.intro_text,
                  solution.intro_text_ar,
                  null
                )}
              </div>
            </Col>

            <Col md={4} className='solution_img'>
              <picture>
                <img
                  src={solution.head_image}
                  alt='Head_Image'
                  className='w-100'
                />
              </picture>
            </Col>
          </Row>
          <div className='content_title'>
            <div className='solution_title_container'>
              <div className='solution_title'>
                {solution &&
                  TextAnimation(
                    'hpt_page.title.first_text',
                    'title_span_text',
                    solution.title.first_title_text,
                    solution.title_ar.first_title_text_ar,
                    null
                  )}
              </div>
              <div className='solution_title'>
                {solution &&
                  TextAnimation(
                    'hpt_page.title.last_text',
                    'title_span_text',
                    solution.title.last_title_text,
                    solution.title_ar.last_title_text_ar,
                    null
                  )}
              </div>

              {i18n.language === 'en' ? (
                <div className='title_arrow'>
                  <div className='arrow'>
                    <picture>
                      <img src={titleArrow} alt='Title Arrow' />
                    </picture>
                  </div>
                  <div className='solution_sub_title'>
                    <div>
                      {solution &&
                        TextAnimation(
                          'hpt_page.sub_title.first_text',
                          'sub_title_span_text',
                          solution.sub_title.first_sub_title_text,
                          solution.sub_title_ar.first_sub_title_text_ar,
                          null
                        )}
                    </div>
                    <div>
                      {solution &&
                        TextAnimation(
                          'hpt_page.sub_title.last_text',
                          'sub_title_span_text',
                          solution.sub_title.last_sub_title_text,
                          solution.sub_title_ar.last_sub_title_text_ar,
                          null
                        )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='title_arrow'>
                  <div className='solution_sub_title'>
                    <div>
                      {solution &&
                        TextAnimation(
                          'hpt_page.sub_title.first_text',
                          'sub_title_span_text',
                          solution.sub_title.first_sub_title_text,
                          solution.sub_title_ar.first_sub_title_text_ar,
                          null
                        )}
                    </div>
                    <div>
                      {solution &&
                        TextAnimation(
                          'hpt_page.sub_title.last_text',
                          'sub_title_span_text',
                          solution.sub_title.last_sub_title_text,
                          solution.sub_title_ar.last_sub_title_text_ar,
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
                <CreateNewSolutionCard />
              </div>
            ) : null}
            <Row>
              {solutionsCard &&
                solutionsCard.map((card, index) => (
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

                        <CreateSolutionTab card_id={card._id} />

                        <EditSolutionCard card={card} />
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
                            dispatch(createSolutionCard(card));
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
          <section className='solution_footer'>
            <picture>
              <img
                src={solution.footer_image}
                alt='Footer_Image.'
                className='w-100'
              />
            </picture>
            <Row className='solution_footer_text'>
              <LinesAnimation />
              <Col md={8}>
                {solution && (
                  <div className='footer_text_word'>
                    <div>
                      {TextAnimation(
                        'hpt_page.footer_text.first_text',
                        'footer_span_text',
                        solution.footer_text.first_footer_text,
                        solution.footer_text_ar.first_footer_text_ar,
                        null
                      )}
                    </div>
                    <div>
                      {TextAnimation(
                        'hpt_page.footer_text.last_text',
                        'footer_span_text',
                        solution.footer_text.last_footer_text,
                        solution.footer_text_ar.last_footer_text_ar,
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

export default HptSolutionsPage;
