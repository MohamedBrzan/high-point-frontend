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
import { useCreateBriefMutation } from '../../../../store/apis/Career/Career';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const CreateBriefForm = ({ career, refetchCareer }) => {
  const { t } = useTranslation();
  const [makeNewBrief, { isLoading }] = useCreateBriefMutation();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [descriptionOne, setDescriptionOne] = useState('');
  const [descriptionOneAr, setDescriptionOneAr] = useState('');
  const [descriptionTwo, setDescriptionTwo] = useState('');
  const [descriptionTwoAr, setDescriptionTwoAr] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewBrief = async (e) => {
    try {
      e.preventDefault();

      const data = {
        title,
        title_ar: titleAr,
        description_one: descriptionOne,
        description_one_ar: descriptionOneAr,
        description_two: descriptionTwo,
        description_two_ar: descriptionTwoAr,
      };

      await makeNewBrief({ career_id: career._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('create_success'), {
              position: 'top-center',
            });

            setTitle('');
            setTitleAr('');
            setDescriptionOne('');
            setDescriptionOneAr('');
            setDescriptionTwo('');
            setDescriptionTwoAr('');
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
          en: 'Create New Brief',
          ar: 'أنشاء نبذه جديدة',
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
              en: 'Create New Brief',
              ar: 'أنشاء نبذه جديدة',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewBrief(e)}>
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
                    Sub {t('identifier_text_name.desc_one')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={descriptionOne}
                    onChange={(e) => setDescriptionOne(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_one')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={descriptionOneAr}
                    onChange={(e) => setDescriptionOneAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Sub {t('identifier_text_name.desc_two')} ( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={descriptionTwo}
                    onChange={(e) => setDescriptionTwo(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_two')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={descriptionTwoAr}
                    onChange={(e) => setDescriptionTwoAr(changeValue(e))}
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

export default CreateBriefForm;
