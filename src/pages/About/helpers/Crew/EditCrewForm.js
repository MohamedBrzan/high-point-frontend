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
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import { useEffect } from 'react';
import { useUpdateCrewMutation } from '../../../../store/apis/About/About';

const EditCrewForm = ({ about, crew, refetchAbout }) => {
  const { t } = useTranslation();
  const [updateCrew, { isLoading }] = useUpdateCrewMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');

  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleAr, setJobTitleAr] = useState('');

  const [bio, setBio] = useState('');
  const [bioAr, setBioAr] = useState('');

  const [image, setImage] = useState('');

  const changeValue = (e) => e.target.value;

  const changeImage = () => {
    const file = document.getElementById('editCrewImage').files[0];
    // const preview = document.getElementById('crewImagePreview');

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
        // preview.src = reader.result;
        setImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateCrewData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name,
        name_ar: nameAr,
        job_title: jobTitle,
        job_title_ar: jobTitleAr,
        bio,
        bio_ar: bioAr,
        image,
      };

      await updateCrew({
        about_id: about._id,
        crew_id: crew._id,
        ...data,
      }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

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

  useEffect(() => {
    setName(crew.name);
    setNameAr(crew.name_ar);
    setJobTitle(crew.job_title);
    setJobTitleAr(crew.job_title_ar);
    setBio(crew.bio);
    setBioAr(crew.bio_ar);
    setImage(crew.image);
  }, [
    crew.bio,
    crew.bio_ar,
    crew.image,
    crew.job_title,
    crew.job_title_ar,
    crew.name,
    crew.name_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit Crew',
          ar: 'تعديل إجابة',
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
              en: 'Edit Crew',
              ar: 'تعديل إجابة',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => updateCrewData(e)}>
            {' '}
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.job_title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.job_title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={jobTitleAr}
                    onChange={(e) => setJobTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
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
                    required
                    disabled={isLoading}
                    value={nameAr}
                    onChange={(e) => setNameAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.bio')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={bio}
                    onChange={(e) => setBio(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.bio')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={bioAr}
                    onChange={(e) => setBioAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.image')} ( AR )
              </FormLabel>
              <FormControl
                type='file'
                disabled={isLoading}
                id='editCrewImage'
                onChange={changeImage}
              />
              <img src={image} alt='Crew_Image' className='mt-3 w-100' />
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

export default EditCrewForm;
