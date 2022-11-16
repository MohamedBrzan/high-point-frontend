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

import './Create.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {
  useCreateSolutionCardMutation,
  useGetAllSolutionsCardQuery,
} from '../../../../store/apis/SolutionsCard/SolutionsCard';

const CreateNewSolutionCard = () => {
  const { t } = useTranslation();
  const { refetch } = useGetAllSolutionsCardQuery();
  const [createCard, { isLoading: creating }] = useCreateSolutionCardMutation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeValue = (e) => e.target.value;

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');

  const [cardImage, setCardImage] = useState('');
  const [viewImage, setViewImage] = useState('');

  const [imageText, setImageText] = useState('');
  const [imageTextAr, setImageTextAr] = useState('');

  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  const uploadCardImage = () => {
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
        setCardImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadViewImage = () => {
    const file = document.getElementById('uploadViewImage').files[0];
    const preview = document.getElementById('viewImagePreview');

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
        setViewImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const createNewCard = async (e) => {
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
      } else if (!cardImage || !viewImage) {
        return toast.error(t('error.image'), {
          position: 'top-center',
        });
      } else if (imageText === '') {
        return toast.error(t('error.image_text'), {
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
        card_image: cardImage,
        view_image: viewImage,
        image_text: imageText,
        image_text_ar: imageTextAr,
        description: descriptionEn,
        description_ar: descriptionAr,
      };

      await createCard({ ...data })
        .then((response) => {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setTitleEn('');
          setTitleAr('');

          setCardImage('');
          setViewImage('');

          setImageText('');
          setImageTextAr('');

          setDescriptionEn('');
          setDescriptionAr('');

          refetch();
          handleClose();
        })
        .catch((error) =>
          toast.error(error.message, {
            position: 'top-center',
          })
        );
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='solution_schema_form'>
      {' '}
      <div
        md={6}
        className='section_create_btn'
        onClick={handleShow}
        title={t('create.card')}
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
          <Modal.Title>{t('create.card')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => createNewCard(e)}>
          <Modal.Body>
            {' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN ) :{' '}
                  </FormLabel>
                  <FormControl
                    type='text'
                    value={titleEn}
                    onChange={(e) => setTitleEn(changeValue(e))}
                    placeholder={t('placeholder.title')}
                  />
                </FormGroup>{' '}
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( AR ) :{' '}
                  </FormLabel>
                  <FormControl
                    type='text'
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                    placeholder={t('placeholder.title_ar')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.card_image')} :{' '}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadCardImage'
                    onChange={uploadCardImage}
                    pattern='image/*'
                  />
                  <img
                    src={cardImage}
                    id='cardImagePreview'
                    alt='Card_Image'
                    className='w-100 mt-3'
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.view_image')} :{' '}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadViewImage'
                    onChange={uploadViewImage}
                    pattern='image/*'
                  />
                  <img
                    src={viewImage}
                    id='viewImagePreview'
                    alt='View_Image'
                    className='w-100 mt-3'
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.image_text')} ( EN ) :{' '}
                  </FormLabel>
                  <FormControl
                    type='text'
                    as={'textarea'}
                    rows={10}
                    value={imageText}
                    onChange={(e) => setImageText(changeValue(e))}
                    placeholder={t('placeholder.image_text')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.image_text')} ( AR ) :{' '}
                  </FormLabel>
                  <FormControl
                    type='text'
                    as={'textarea'}
                    rows={10}
                    value={imageTextAr}
                    onChange={(e) => setImageTextAr(changeValue(e))}
                    placeholder={t('placeholder.image_text_ar')}
                  />
                </FormGroup>
              </Col>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.description')} ( EN ) :{' '}
                </FormLabel>
                <FormControl
                  type='text'
                  as={'textarea'}
                  rows={10}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(changeValue(e))}
                  placeholder={t('placeholder.description')}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.description')} ( AR ) :{' '}
                </FormLabel>
                <FormControl
                  type='text'
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
    </div>
  );
};

export default CreateNewSolutionCard;
