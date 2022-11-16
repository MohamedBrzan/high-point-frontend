import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
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
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';
import { useUpdatePrivacyAndCookiesMutation } from '../../../store/apis/PrivacyAndCookies/PrivacyAndCookies';
import { useEffect } from 'react';

const EditPolicyForm = ({ policy, refetchPolicy }) => {
  const { t, i18n } = useTranslation();

  const [updatePolicy, { isLoading }] = useUpdatePrivacyAndCookiesMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  const changeValue = (e) => e.target.value;

  const editPolicy = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title,
        title_ar: titleAr,
        description,
        description_ar: descriptionAr,
      };

      await updatePolicy({ privacyAndCookies_id: policy._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('update_success'), {
              position: 'top-center',
            });

            handleClose();
            return refetchPolicy();
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
    setTitle(policy.title);
    setTitleAr(policy.title_ar);
    setDescription(policy.description);
    setDescriptionAr(policy.description_ar);
  }, [
    policy.description,
    policy.description_ar,
    policy.title,
    policy.title_ar,
  ]);

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
          en: 'Update Policy',
          ar: 'تعديل سياسة الخصوصية',
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='3x' />
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
              en: 'Update Policy',
              ar: 'تعديل سياسة الخصوصية',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editPolicy(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={title}
                    onChange={(e) => setTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( EN )
                  </FormLabel>

                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={description}
                    onChange={(e) => setDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( AR )
                  </FormLabel>

                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(changeValue(e))}
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

export default EditPolicyForm;
