import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdatePartnerMutation } from '../../../store/apis/Partner/Partner';
import { createPartner } from '../../../store/reducers/Partner/PartnerSlice';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const EditPartnerForm = ({ partnerData, refetch }) => {
  const { t } = useTranslation();
  const [updatePartner, { isLoading }] = useUpdatePartnerMutation();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { partner } = useSelector((state) => state.partner);

  const [name, setName] = useState(partner.name);
  const [nameAr, setNameAr] = useState(partner.name_ar);

  const [countryAr, setCountryAr] = useState('');
  const [country, setCountry] = useState('');

  const [continentAr, setContinentAr] = useState(partner.continent);
  const [continent, setContinent] = useState(partner.continent_ar);

  const [image, setImage] = useState(partner.image);

  const changeValue = (e) => e.target.value;

  function changeImage() {
    const file = document.getElementById('partnerImage').files[0];

    const preview = document.getElementById('partnerImagePreview');

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }

    const reader = new FileReader();

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
  }

  const editPartner = async (e) => {
    try {
      const data = {
        name: name,
        name_ar: nameAr,
        image: image,
        continent: continent,
        continent_ar: continentAr,
      };
      e.preventDefault();
      await updatePartner({ partner_id: partner._id, ...data }).then(
        (response) => {
          if (response.data) {
            dispatch(createPartner(response.data));
            toast.success(t('update_success'), {
              position: 'top-center',
            });
            handleClose();
            refetch();
          } else {
            toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        }
      );
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    setName(partner.name);
    setNameAr(partner.name_ar);
    setContinentAr(partner.continent);
    setContinent(partner.continent_ar);
    setImage(partner.image);
    setCountry(partner.country);
    setCountryAr(partner.country_ar);
  }, [
    partner.continent,
    partner.continent_ar,
    partner.country,
    partner.country_ar,
    partner.image,
    partner.name,
    partner.name_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_btn'
        onClick={() => {
          dispatch(createPartner(partnerData));
          handleShow();
        }}
        title={t('hpt_page.card.title', {
          en: `Edit ${partner.name}`,
          ar: `تعديل ${partner.name_ar}`,
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
            {t('identifier_text_name.name', {
              en: partner.name,
              ar: partner.name_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editPartner(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={nameAr}
                    onChange={(e) => setNameAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.continent')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={continent}
                    onChange={(e) => setContinent(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.continent')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={continentAr}
                    onChange={(e) => setContinentAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.image')}
              </FormLabel>
              <FormControl
                disabled={isLoading}
                type='file'
                id='partnerImage'
                onChange={changeImage}
              />
              <img
                src={image}
                id='partnerImagePreview'
                alt='Partner_Image'
                className='w-100 mt-3'
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

export default EditPartnerForm;
