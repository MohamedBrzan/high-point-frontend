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
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import { useCreateAnswerMutation } from '../../../../store/apis/About/About';

const CreateAnswerForm = ({ about, refetchAbout }) => {
  const { t } = useTranslation();
  const [makeNewAnswer, { isLoading }] = useCreateAnswerMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [text, setText] = useState('');
  const [textAr, setTextAr] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewAnswer = async (e) => {
    try {
      e.preventDefault();
      const data = {
        text,
        text_ar: textAr,
      };

      await makeNewAnswer({ about_id: about._id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setText('');
          setTextAr('');

          handleClose();
          return refetchAbout();
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
        className='create_section_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Answer',
          ar: 'أنشاء إجابة جديدة',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='1x' />
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
              en: 'Create New Answer',
              ar: 'أنشاء إجابة جديدة',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewAnswer(e)}>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.text')} ( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={text}
                    onChange={(e) => setText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={textAr}
                    onChange={(e) => setTextAr(changeValue(e))}
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

export default CreateAnswerForm;
