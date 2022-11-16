import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
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
import { useUpdateDevelopmentMutation } from '../../../../store/apis/Interface/Interface';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const EditDevelopmentForm = ({
  development_id,
  development,
  interface_id,
  refetchInterface,
}) => {
  const { t } = useTranslation();
  const [updateDevelopment, { isLoading }] = useUpdateDevelopmentMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [field, setField] = useState('');
  const [fieldAr, setFieldAr] = useState('');
  const [progress, setProgress] = useState(0);

  const changeValue = (e) => e.target.value;

  const updateDevelopmentData = async (e) => {
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

      await updateDevelopment({
        interface_id,
        development_id,
        ...data,
      }).then((response) => {
        if (response.data) {
          toast.success(t('update_success'), {
            position: 'top-center',
          });

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

  useEffect(() => {
    setField(development.field);
    setFieldAr(development.field_ar);
    setProgress(development.progress);
  }, [development.field, development.field_ar, development.progress]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit Development',
          ar: 'تعديل مجال تطور',
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
              en: 'Edit Development',
              ar: 'تعديل مجال تطور',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => updateDevelopmentData(e)}>
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
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditDevelopmentForm;
