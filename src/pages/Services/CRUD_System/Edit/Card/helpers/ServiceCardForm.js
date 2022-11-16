import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  useGetAllServicesCardQuery,
  useGetServiceCardByIdQuery,
  useUpdateServiceCardMutation,
} from '../../../../../../store/apis/ServicesCard/ServicesCard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceCard } from '../../../../../../store/reducers/services/Card';
import CustomSpinner from '../../../../../../utils/CustomSpinner/CustomSpinner';
import '../EditServiceCard.css';

const ServiceCardForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const { serviceCard } = useSelector((state) => state.serviceCard);

  const { refetch } = useGetAllServicesCardQuery();
  const {
    data: card,
    isLoading,
    isSuccess,
  } = useGetServiceCardByIdQuery(serviceCard._id && serviceCard._id);

  const [updateCard, { isLoading: Updating }] = useUpdateServiceCardMutation();
  const dispatch = useDispatch();

  const changeValue = (e) => e.target.value;

  // Card Title

  const [title, setTitle] = useState(serviceCard.title || '');

  const [titleAr, setTitleAr] = useState(serviceCard.title_ar || '');

  // Card Description

  const [description, setDescription] = useState(serviceCard.description || '');

  const [descriptionAr, setDescriptionAr] = useState(
    serviceCard.description_ar || ''
  );

  // Card Images

  const [cardImage, setCardImage] = useState(serviceCard.card_image || '');

  const [viewImage, setViewImage] = useState(serviceCard.view_image || '');

  // Card Image Text

  const [imageText, setImageText] = useState(serviceCard.image_text || '');

  const [imageTextAr, setImageTextAr] = useState(
    serviceCard.image_text_ar || ''
  );

  const changeCardImage = () => {
    const file = document.getElementById('cardImage').files[0];
    const preview = document.getElementById('cardImagePreview');

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
        setCardImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const changeViewImage = () => {
    const file = document.getElementById('viewImage').files[0];
    const preview = document.getElementById('viewImagePreview');

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
        setViewImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateCardData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title,
        title_ar: titleAr,
        image_text: imageText,
        image_text_ar: imageTextAr,
        card_image: cardImage,
        view_image: viewImage,
        description,
        description_ar: descriptionAr,
      };
      await updateCard({ card_id: card._id, ...data })
        .then((response) => {
          dispatch(createServiceCard(response.data));
          toast.success(t('update_success'), {
            position: 'top-center',
          });
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

  if (isLoading) return <CustomSpinner />;
  return (
    <section className='service_schema_form'>
      <Form onSubmit={(e) => updateCardData(e)}>
        <Modal.Body>
          <Row className='main_row'>
            <Col md={6}>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.title_text')}
                </FormLabel>
                <div className='p-2'>
                  <FormLabel>{t('identifier_text_name.text')} ( EN )</FormLabel>
                  <FormControl
                    required
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(changeValue(e))}
                  />
                </div>
                <div className='p-2'>
                  <FormLabel>{t('identifier_text_name.text')} ( AR )</FormLabel>
                  <FormControl
                    required
                    type='text'
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.image_text')}
                </FormLabel>
                <div className='p-2'>
                  <FormLabel>{t('identifier_text_name.text')} ( EN )</FormLabel>
                  <FormControl
                    required
                    type='text'
                    as='textarea'
                    rows={5}
                    value={imageText}
                    onChange={(e) => setImageText(changeValue(e))}
                  />
                </div>
                <div className='p-2'>
                  <FormLabel>{t('identifier_text_name.text')} ( AR )</FormLabel>
                  <FormControl
                    required
                    type='text'
                    as='textarea'
                    rows={5}
                    value={imageTextAr}
                    onChange={(e) => setImageTextAr(changeValue(e))}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.card_image')}
                </FormLabel>
                <FormControl
                  type='file'
                  id='cardImage'
                  accept='image/gif, image/jpeg, image/png'
                  onChange={changeCardImage}
                />
                <img
                  src={cardImage}
                  id='cardImagePreview'
                  alt='Card_Image.'
                  className='w-100 mt-3'
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.view_image')}
                </FormLabel>
                <FormControl
                  type='file'
                  id='viewImage'
                  accept='image/gif, image/jpeg, image/png'
                  onChange={changeViewImage}
                />
                <img
                  src={viewImage}
                  id='viewImagePreview'
                  alt='View_Image.'
                  className='w-100 mt-3'
                />
              </FormGroup>
            </Col>

            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.description')}
              </FormLabel>
              <div className='p-2'>
                <FormLabel>{t('identifier_text_name.text')} ( EN )</FormLabel>
                <FormControl
                  required
                  type='text'
                  as={'textarea'}
                  row={5}
                  value={description}
                  onChange={(e) => setDescription(changeValue(e))}
                />
              </div>
              <div className='p-2'>
                <FormLabel>{t('identifier_text_name.text')} ( AR )</FormLabel>
                <FormControl
                  required
                  type='text'
                  as={'textarea'}
                  row={5}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(changeValue(e))}
                />
              </div>
            </FormGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='m-2 p-3 submit_btn'
            disabled={isLoading}
            type='submit'
          >
            {Updating ? <CustomSpinner /> : t('save_btn')}
          </Button>
        </Modal.Footer>
      </Form>
    </section>
  );
};

export default ServiceCardForm;
