import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
import { useUpdateDocumentMutation } from '../../../../store/apis/Documentation/Documentation';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const EditDocumentForm = ({
  documentation_id,
  document,
  refetchDocumentation,
}) => {
  const { t } = useTranslation();
  const [editDocument, { isLoading }] = useUpdateDocumentMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tabTitle, setTabTitle] = useState('');
  const [tabTitleAr, setTabTitleAr] = useState('');
  const [descriptionTitle, setDescriptionTitle] = useState('');
  const [descriptionTitleAr, setDescriptionTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  const changeValue = (e) => e.target.value;

  const editDocumentData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        tab_title: tabTitle,
        tab_title_ar: tabTitleAr,
        desc_title: descriptionTitle,
        desc_title_ar: descriptionTitleAr,
        description,
        description_ar: descriptionAr,
      };

      await editDocument({
        documentation_id,
        document_id: document._id,
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
    setTabTitle(document.tab_title);
    setTabTitleAr(document.tab_title_ar);
    setDescriptionTitle(document.desc_title);
    setDescriptionTitleAr(document.desc_title_ar);
    setDescription(document.description);
    setDescriptionAr(document.description_ar);
  }, [
    document.desc_title,
    document.desc_title_ar,
    document.description,
    document.description_ar,
    document.tab_title,
    document.tab_title_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit document',
          ar: 'تعديل نبذه عنا',
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
              en: 'Edit document',
              ar: 'تعديل نبذه عنا',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editDocumentData(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={tabTitle}
                    onChange={(e) => setTabTitle(changeValue(e))}
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
                    disabled={isLoading}
                    value={tabTitleAr}
                    onChange={(e) => setTabTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={descriptionTitle}
                    onChange={(e) => setDescriptionTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={descriptionTitleAr}
                    onChange={(e) => setDescriptionTitleAr(changeValue(e))}
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

export default EditDocumentForm;
