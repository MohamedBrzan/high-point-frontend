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
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreatePartnerMutation } from '../../../store/apis/Partner/Partner';
import { createPartner } from '../../../store/reducers/Partner/PartnerSlice';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const CreatePartnerForm = ({ partnerData, refetch }) => {
  const { t } = useTranslation();
  const [makeNewPartner, { isLoading }] = useCreatePartnerMutation();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');

  const [countryAr, setCountryAr] = useState('');

  const [country, setCountry] = useState('');

  const [continentAr, setContinentAr] = useState('');
  const [continent, setContinent] = useState('');

  const [image, setImage] = useState('');

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

  const createNewPartner = async (e) => {
    try {
      const data = {
        name: name,
        name_ar: nameAr,
        image: image,
        country: country,
        country_ar: countryAr,
        continent: continent,
        continent_ar: continentAr,
      };
      e.preventDefault();
      await makeNewPartner({ ...data }).then((response) => {
        if (response.data) {
          dispatch(createPartner(response.data));
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setName('');
          setNameAr('');
          setContinentAr('');
          setContinent('');
          setImage('');
          setCountry('');
          setCountryAr('');
          handleClose();
          refetch();
        } else {
          toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='create_btn'
        onClick={() => handleShow()}
        title={t('hpt_page.card.title', {
          en: 'Create New Partner',
          ar: 'إنشاء شريك جديد',
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
              en: 'Create New Partner',
              ar: 'إنشاء شريك جديد',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewPartner(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
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
                    onChange={(e) => setNameAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.country')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    onChange={(e) => setCountry(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.country')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    onChange={(e) => setCountryAr(changeValue(e))}
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

export default CreatePartnerForm;
