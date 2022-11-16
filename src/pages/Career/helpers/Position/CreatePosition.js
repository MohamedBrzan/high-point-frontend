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
import { useCreatePositionMutation } from '../../../../store/apis/Career/Career';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const CreatePositionForm = ({ career, refetchCareer }) => {
  const { t } = useTranslation();
  const [makeNewPosition, { isLoading }] = useCreatePositionMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subTitleAr, setSubTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [content, setContent] = useState('');
  const [contentAr, setContentAr] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewPosition = async (e) => {
    try {
      e.preventDefault();

      const data = {
        title,
        title_ar: titleAr,
        sub_title: subTitle,
        sub_title_ar: subTitleAr,
        description,
        description_ar: descriptionAr,
        content,
        content_ar: contentAr,
      };

      await makeNewPosition({ career_id: career._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('create_success'), {
              position: 'top-center',
            });

            setTitle('');
            setTitleAr('');
            setSubTitle('');
            setSubTitleAr('');
            setDescription('');
            setDescriptionAr('');
            setContent('');
            setContentAr('');
            handleClose();
            return refetchCareer();
          } else {
            return toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        }
      );
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
        className='create_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New position',
          ar: 'أنشاء منصب جديد',
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
              en: 'Create New position',
              ar: 'أنشاء منصب جديد',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewPosition(e)}>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={title}
                    onChange={(e) => setTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={subTitle}
                    onChange={(e) => setSubTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={subTitleAr}
                    onChange={(e) => setSubTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Sub {t('identifier_text_name.description')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={description}
                    onChange={(e) => setDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Sub {t('identifier_text_name.content')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={content}
                    onChange={(e) => setContent(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.content')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={contentAr}
                    onChange={(e) => setContentAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button disabled={isLoading} type='submit'>
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreatePositionForm;
