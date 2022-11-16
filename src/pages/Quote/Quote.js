import React, { useRef, useState } from 'react';
import { Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import arrow from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import './Quote.css';
import { toast } from 'react-toastify';
import StyledButton from '../../common/StyledButton/StyledButton';
import {
  useDeleteDecisionMutation,
  useDeleteQAMutation,
  useGetAllQuotesQuery,
  useGetQuoteByIdQuery,
} from '../../store/apis/Quote/Quote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesDown,
  faCheck,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import CreateDecisionForm from './helpers/decision/CreateDecisionForm';
import EditDecisionForm from './helpers/decision/EditDecisionForm';
import CreateQAndAForm from './helpers/QAndA/CreateQAndAForm';
import EditQAndAForm from './helpers/QAndA/EditQAndAForm';
import EditQuoteForm from './helpers/EditQuoteForm';
import CreateQuoteForm from './helpers/CreateQuoteForm';
import { useCreateRequestMutation } from '../../store/apis/Request/Request';
import { useSelector } from 'react-redux';
// import NuclearAnimation from '../../anim/NuclearAnimation/NuclearAnimation';
import RemoveForMoreThanId from '../../functions/RemoveForMoreThanId';
import PageTitle from '../../utils/PageTitle';

const Quote = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;

  const { data: allQuotes, isLoading, refetch } = useGetAllQuotesQuery();

  const {
    data: quote,
    isSuccess: quoteIsSuccess,
    refetch: refetchQuote,
  } = useGetQuoteByIdQuery(
    allQuotes && allQuotes[0] && allQuotes[0]._id ? allQuotes[0]._id : ''
  );
  const [deleteDecision] = useDeleteDecisionMutation();
  const [deleteQA] = useDeleteQAMutation();
  const [createRequest] = useCreateRequestMutation();

  const decisionSelectedValueRef = useRef();
  const decisionValueRef = useRef();

  const checkBox = useRef();
  const checkIcon = useRef();

  const closeCustomSelectedForm = (e) => {
    decisionSelectedValueRef.current.classList.add('d-none');
    setSelectedValue(e.target.textContent);
  };

  const toggleCustomSelectedForm = () =>
    decisionSelectedValueRef.current.classList.toggle('d-none');

  const toggleChecked = () => checkIcon.current.classList.toggle('d-none');

  const [selectedValue, setSelectedValue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const changeValue = (e) => e.target.value;

  const data = {
    name: selectedValue,
    email,
    phone: phone,
  };

  const SendRequest = async (e) => {
    try {
      e.preventDefault();
      if (!selectedValue) {
        return toast.error(t('selected_value_error'), {
          position: 'top-center',
        });
      } else if (
        document
          .querySelector('.rule .check_box .check_icon')
          .classList.contains('d-none')
      ) {
        return toast.error(t('rule_error'), {
          position: 'top-center',
        });
      }
      await createRequest({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setSelectedValue('');
          setEmail('');
          setPhone('');
        } else {
          toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };
  useEffect(() => {
    if (quoteIsSuccess) {
      const allQuestions = document.querySelectorAll('.quote_form .question');
      const allAnswers = document.querySelectorAll('.quote_form .answer');

      allAnswers.forEach((answer) => answer.classList.remove('active'));
      allQuestions.forEach((question) => {
        question.onclick = () => {
          question.nextElementSibling.classList.toggle('active');
          question.children[0].style.transform += 'rotate(90deg)';
        };
      });
    }
  }, [quoteIsSuccess]);

  return (
    <section className='quote_form'>
      <PageTitle>Quote</PageTitle>
      <div className='section-head-image'></div>
      {/* <div className='nuclear_canvas_container'>{NuclearAnimation()}</div> */}
      <Row className='quote_row'>
        <Col md={3}>
          {isAdmin ? (
            quote && quote._id ? (
              <EditQuoteForm quote={quote} refetchQuote={refetchQuote} />
            ) : (
              <CreateQuoteForm refetch={refetch} />
            )
          ) : null}
        </Col>
        {quote && quote._id && (
          <Col md={9}>
            <Row>
              {' '}
              <Col md={5}>
                {' '}
                <div className='form_section'>
                  <div className='title'>
                    <div>
                      {' '}
                      {t('hpt_page.quote_page.title', {
                        en: quote.title,
                        ar: quote.title_ar,
                      })}
                    </div>
                  </div>
                  <div className='sub_title'>
                    <div className='arrow_container'>
                      {' '}
                      {i18n.language === 'en' ? (
                        <img
                          src={arrow}
                          alt='ARROW_IMG'
                          className='arrow_img'
                        />
                      ) : (
                        <img
                          src={arrowAr}
                          alt='ARROW_IMG'
                          className='arrow_img'
                        />
                      )}
                    </div>{' '}
                    {t('hpt_page.quote_page.sub_title', {
                      en: quote.sub_title,
                      ar: quote.sub_title_ar,
                    })}
                  </div>
                  <p>
                    {' '}
                    {t('hpt_page.quote_page.sub_title', {
                      en: quote.description,
                      ar: quote.description_ar,
                    })}
                  </p>
                  <Form onSubmit={(e) => SendRequest(e)} className='form'>
                    {' '}
                    <div className='custom_select_form'>
                      {isAdmin ? (
                        <CreateDecisionForm
                          quote={quote}
                          refetchQuote={refetchQuote}
                        />
                      ) : null}
                      <div
                        className='selected_value'
                        onClick={(e) => toggleCustomSelectedForm(e)}
                      >
                        {selectedValue}
                        <div className='icon'>
                          <FontAwesomeIcon icon={faAnglesDown} size='1x' />
                        </div>
                      </div>
                      <div
                        className='values d-none'
                        ref={decisionSelectedValueRef}
                      >
                        {quote.decisions &&
                          quote.decisions.length > 0 &&
                          quote.decisions.map(
                            ({ _id, name, name_ar }, index) => (
                              <div
                                className='value'
                                key={index}
                                ref={decisionValueRef}
                                onClick={(e) => closeCustomSelectedForm(e)}
                              >
                                {isAdmin ? (
                                  <div className='actions'>
                                    <EditDecisionForm
                                      quote={quote}
                                      decision={{ _id, name, name_ar }}
                                      refetchQuote={refetchQuote}
                                    />
                                    <div
                                      className='delete_btn'
                                      onClick={() => {
                                        const data = {
                                          quote_id: quote._id,
                                          decision_id: _id,
                                        };

                                        RemoveForMoreThanId(
                                          'decision',
                                          deleteDecision,
                                          data,
                                          refetchQuote
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        size='1x'
                                      />
                                    </div>
                                  </div>
                                ) : null}
                                {t('hpt_page.quote_page.decision_value', {
                                  en: name,
                                  ar: name_ar,
                                })}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <FormGroup className='mb-3'>
                      <FormControl
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(changeValue(e))}
                        className='quote__form-control'
                        placeholder={t('hpt_page.quote_page.email')}
                        required
                        disabled={isLoading}
                      />
                    </FormGroup>
                    <FormGroup className='mb-3'>
                      <FormControl
                        type='number'
                        value={phone}
                        onChange={(e) => setPhone(changeValue(e))}
                        className='quote__form-control'
                        placeholder={t('hpt_page.quote_page.phone')}
                        required
                        disabled={isLoading}
                      />
                    </FormGroup>{' '}
                    <div className='quote__btn-container'>
                      <button type='submit' className='quote__submit-btn'>
                        {' '}
                        {i18n.language === 'en' ? (
                          <StyledButton
                            color={'white'}
                            borderColor={'white'}
                            borderRightWidth={'.1em'}
                            borderRightColor={'white'}
                          >
                            {t('hpt_page.quote_page.send_message_btn')}
                          </StyledButton>
                        ) : (
                          <StyledButton
                            color={'white'}
                            borderColor={'white'}
                            borderLeftWidth={'.1em'}
                            borderLeftColor={'white'}
                            iconDir='rtl'
                          >
                            {t('hpt_page.quote_page.send_message_btn')}
                          </StyledButton>
                        )}
                      </button>
                    </div>
                  </Form>
                  <div className='rule'>
                    {' '}
                    <div
                      className='check_box'
                      ref={checkBox}
                      onClick={toggleChecked}
                    >
                      <div className='check_icon' ref={checkIcon}>
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    </div>
                    <div className='rule_text'>
                      {' '}
                      {t('hpt_page.quote_page.decision_value', {
                        en: quote?.rule_text,
                        ar: quote?.rule_text_ar,
                      })}
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4} className='QA'>
                {isAdmin ? (
                  <CreateQAndAForm quote={quote} refetchQuote={refetchQuote} />
                ) : null}
                {quote.q_a &&
                  quote.q_a.map(
                    (
                      { _id, question, question_ar, answer, answer_ar },
                      index
                    ) => (
                      <div className='QA_values' key={index}>
                        {isAdmin ? (
                          <div className='actions'>
                            <EditQAndAForm
                              quote={quote}
                              QA={{
                                _id,
                                question,
                                question_ar,
                                answer,
                                answer_ar,
                              }}
                              refetchQuote={refetchQuote}
                            />
                            <div
                              className='delete_btn'
                              onClick={() => {
                                const data = {
                                  quote_id: quote._id,
                                  q_a_id: _id,
                                };

                                RemoveForMoreThanId(
                                  'q_a',
                                  deleteQA,
                                  data,
                                  refetchQuote
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} size='1x' />
                            </div>
                          </div>
                        ) : null}
                        <div className='question'>
                          {t('hpt_page.quote_page.sub_title', {
                            en: question,
                            ar: question_ar,
                          })}
                          <div className='icon'>
                            <FontAwesomeIcon icon={faPlus} size='2x' />
                          </div>
                        </div>
                        <div className='answer'>
                          {' '}
                          {t('hpt_page.quote_page.sub_title', {
                            en: answer,
                            ar: answer_ar,
                          })}
                        </div>
                      </div>
                    )
                  )}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </section>
  );
};

export default Quote;
