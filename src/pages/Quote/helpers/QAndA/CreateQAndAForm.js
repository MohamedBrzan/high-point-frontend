import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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
import { useCreateQAMutation } from '../../../../store/apis/Quote/Quote';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const CreateQAndAForm = ({ quote, refetchQuote }) => {
  const { t, i18n } = useTranslation();
  const [makeNewQA, { isLoading }] = useCreateQAMutation();

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

      await makeNewQA({ quote_id: quote._id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setQuestion('');
          setQuestionAr('');
          setAnswer('');
          setAnswerAr('');

          handleClose();
          return refetchQuote();
        } else {
          return toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      return toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        style={
          i18n.language === 'en' ? { left: '-2.3em' } : { right: '-2.3em' }
        }
        className='create_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create Q&A',
          ar: 'أنشاء سؤال وجواب جديد',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='2x' />
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
              en: 'Create Q&A',
              ar: 'أنشاء سؤال وجواب جديد',
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
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateQAndAForm;
