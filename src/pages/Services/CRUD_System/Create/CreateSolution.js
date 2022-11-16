import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetAllServicesCardQuery } from '../../../../store/apis/ServicesCard/ServicesCard';
import { useCreateServiceSolutionMutation } from '../../../../store/apis/ServicesSolutions/ServicesSolutions';

import './Create.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const CreateServiceSolution = ({ tab_id }) => {
  const { t } = useTranslation();
  const { refetch } = useGetAllServicesCardQuery();
  const [createSolution, { isLoading: creating }] =
    useCreateServiceSolutionMutation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeValue = (e) => e.target.value;

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');

  const [image, setImage] = useState('');

  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  const uploadImage = () => {
    const file = document.getElementById('uploadCardImage').files[0];
    const preview = document.getElementById('cardImagePreview');

    const reader = new FileReader();

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }

    reader.addEventListener(
      'load',
      () => {
        preview.src = reader.result;
        setImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const createNewSolution = async (e) => {
    try {
      e.preventDefault();

      if (titleEn === '') {
        return toast.error(t('error.title'), {
          position: 'top-center',
        });
      } else if (titleAr === '') {
        return toast.error(t('error.title'), {
          position: 'top-center',
        });
      } else if (!image) {
        return toast.error(t('error.image'), {
          position: 'top-center',
        });
      } else if (descriptionEn === '') {
        return toast.error(t('error.description'), {
          position: 'top-center',
        });
      } else if (descriptionAr === '') {
        return toast.error(t('error.description'), {
          position: 'top-center',
        });
      }

      const data = {
        title: titleEn,
        title_ar: titleAr,
        image: image,
        description: descriptionEn,
        description_ar: descriptionAr,
      };

      await createSolution({ tab_id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setTitleEn('');
          setTitleAr('');
          setImage('');
          setDescriptionEn('');
          setDescriptionAr('');
          refetch();
          handleClose();
          document
            .querySelectorAll('.view-services .card_tab')
            .forEach((tab) => {
              tab.classList.remove('active');
            });
        } else {
          toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      toast.error(error, {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <div
        md={6}
        className='item_create_solution_btn'
        onClick={handleShow}
        title={t('create.solution')}
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
        <Modal.Header className='title' closeButton>
          <Modal.Title>{t('create.solution')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => createNewSolution(e)}>
          <Modal.Body>
            {' '}
            <Row>
              <Col md={6}>
                <FormGroup className='solutions_form_group mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN ) :
                  </FormLabel>
                  <FormControl
                    type='text'
                    name={t('identifier_text_name.title') + ' (EN)'}
                    value={titleEn}
                    onChange={(e) => setTitleEn(changeValue(e))}
                    placeholder={t('placeholder.title')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='solutions_form_group mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( AR ) :
                  </FormLabel>
                  <FormControl
                    type='text'
                    name={t('identifier_text_name.title') + ' (AR)'}
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                    placeholder={t('placeholder.title_ar')}
                  />
                </FormGroup>
              </Col>
              <FormGroup className='solutions_form_group mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.image')} :{' '}
                </FormLabel>
                <FormControl
                  type='file'
                  name={t('identifier_text_name.card_image')}
                  id='uploadCardImage'
                  onChange={uploadImage}
                  pattern='image/*'
                />
                <img
                  src={image}
                  id='cardImagePreview'
                  alt='Image_'
                  className='w-100 mt-3'
                />
              </FormGroup>
              <FormGroup className='solutions_form_group mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.description')} ( EN ) :
                </FormLabel>
                <FormControl
                  type='text'
                  name={t('identifier_text_name.description')}
                  as={'textarea'}
                  rows={10}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(changeValue(e))}
                  placeholder={t('placeholder.description')}
                />
              </FormGroup>
              <FormGroup className='solutions_form_group mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.description')} ( AR ) :
                </FormLabel>
                <FormControl
                  type='text'
                  name={t('identifier_text_name.description')}
                  as={'textarea'}
                  rows={10}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(changeValue(e))}
                  placeholder={t('placeholder.description_ar')}
                />
              </FormGroup>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='m-2 p-3 submit_btn'
              disabled={creating}
              type='submit'
            >
              {t('create_btn')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateServiceSolution;
