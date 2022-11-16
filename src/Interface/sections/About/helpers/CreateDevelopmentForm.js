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
import { useCreateDevelopmentMutation } from '../../../../store/apis/Interface/Interface';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const CreateDevelopmentForm = ({ interface_id, refetchInterface }) => {
  const { t } = useTranslation();
  const [makeNewDevelopment, { isLoading }] = useCreateDevelopmentMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [field, setField] = useState('');
  const [fieldAr, setFieldAr] = useState('');
  const [progress, setProgress] = useState(0);

  const changeValue = (e) => e.target.value;

  const createNewDevelopment = async (e) => {
    try {
      e.preventDefault();
      const data = {
        field,
        field_ar: fieldAr,
        progress,
      };

      if (progress <= 0) {
        return toast.error(
          t('progress_error', {
            en: 'Progress Value Should Bigger than zero',
            ar: 'قيمة التطور يجب أن تكون أكبر من صفر',
          }),
          {
            position: 'top-center',
          }
        );
      }

      await makeNewDevelopment({ interface_id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setField('');
          setFieldAr('');
          setProgress('');

          handleClose();
          return refetchInterface();
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
        className='create_about_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Development',
          ar: 'إنشاء مجال تطور',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='3x' />
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
              en: 'Create New Development',
              ar: 'إنشاء مجال تطور',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewDevelopment(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.field')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={field}
                    onChange={(e) => setField(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.field')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={fieldAr}
                    onChange={(e) => setFieldAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.progress')} ( EN )
              </FormLabel>
              <FormControl
                required
                type='number'
                disabled={isLoading}
                value={progress}
                isValid={progress > 0}
                onChange={(e) => setProgress(changeValue(e))}
              />
            </FormGroup>

            <Button disabled={isLoading} type='submit'>
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateDevelopmentForm;
