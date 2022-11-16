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
import { useUpdateDocumentationMutation } from '../../../store/apis/Documentation/Documentation';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const EditDocumentationForm = ({ documentation, refetchDocumentation }) => {
  const { t } = useTranslation();
  const [editDocumentation, { isLoading }] = useUpdateDocumentationMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [footerText, setFooterText] = useState('');
  const [footerTextAr, setFooterTextAr] = useState('');
  const [footerImage, setFooterImage] = useState('');

  const changeValue = (e) => e.target.value;

  function changeFooterImage() {
    const file = document.getElementById('editDocumentationFooterImage')
      .files[0];

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setFooterImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const editDocumentationData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        name,
        name_ar: nameAr,
        footer_text: footerText,
        footer_text_ar: footerTextAr,
        footer_image: footerImage,
      };

      await editDocumentation({
        documentation_id: documentation._id,
        ...data,
      }).then((response) => {
        if (response.data) {
          toast.success(t('update_success'), {
            position: 'top-center',
          });

          handleClose();
          return refetchDocumentation();
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
    setName(documentation.name);
    setNameAr(documentation.name_ar);
    setFooterImage(documentation.footer_image);
    setFooterText(documentation.footer_text);
    setFooterTextAr(documentation.footer_text_ar);
  }, [
    documentation.footer_image,
    documentation.footer_text,
    documentation.footer_text_ar,
    documentation.name,
    documentation.name_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit documentation',
          ar: 'تعديل نبذه عنا',
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='2x' />
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
              en: 'Edit documentation',
              ar: 'تعديل نبذه عنا',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editDocumentationData(e)}>
            <Row>
              <Col md={6}>
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
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.footer_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerText}
                    onChange={(e) => setFooterText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.footer_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerTextAr}
                    onChange={(e) => setFooterTextAr(changeValue(e))}
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
                id='editDocumentationFooterImage'
                onChange={changeFooterImage}
              />

              <img
                src={footerImage}
                alt='Footer_Image'
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

export default EditDocumentationForm;
