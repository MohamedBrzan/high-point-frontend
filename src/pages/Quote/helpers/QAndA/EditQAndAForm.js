import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useUpdateQAMutation } from '../../../../store/apis/Quote/Quote';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const EditQAndAForm = ({ quote, QA, refetchQuote }) => {
  const { t, i18n } = useTranslation();
  const [updateQA, { isLoading }] = useUpdateQAMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [question, setQuestion] = useState('');
  const [questionAr, setQuestionAr] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerAr, setAnswerAr] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewQuote = async (e) => {
    try {
      e.preventDefault();
      const data = {
        question,
        question_ar: questionAr,
        answer,
        answer_ar: answerAr,
      };

      await updateQA({ quote_id: quote._id, q_a_id: QA._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('update_success'), {
              position: 'top-center',
            });

            handleClose();
            return refetchQuote();
          } else {
            return toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        }
      );
    } catch (error) {
      return toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    setQuestion(QA.question);
    setQuestionAr(QA.question_ar);
    setAnswer(QA.answer);
    setAnswerAr(QA.answer_ar);
  }, [QA.answer, QA.answer_ar, QA.question, QA.question_ar]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        style={
          i18n.language === 'en' ? { left: '-2.3em' } : { right: '-2.3em' }
        }
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit Q&A',
          ar: 'تعديل سؤال وجواب',
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='1x' />
      </div>

      <Modal
        show={show}
        size='xl'
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t('hpt_page.card.title', {
              en: 'Edit Q&A',
              ar: 'تعديل سؤال وجواب',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewQuote(e)}>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.question')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={question}
                    onChange={(e) => setQuestion(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.question')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={questionAr}
                    onChange={(e) => setQuestionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.answer')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={answer}
                    onChange={(e) => setAnswer(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.answer')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={answerAr}
                    onChange={(e) => setAnswerAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button disabled={isLoading} type='submit'>
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditQAndAForm;
