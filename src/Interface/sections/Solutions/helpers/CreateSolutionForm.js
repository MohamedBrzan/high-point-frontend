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
import { toast } from 'react-toastify';
import { useCreateSolutionMutation } from '../../../../store/apis/Interface/Interface';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import UploadFile from '../../../../functions/UploadFile';

const CreateSolutionForm = ({ interface_id, refetchInterface }) => {
  const { t } = useTranslation();
  const [makeNewSolution, { isLoading }] = useCreateSolutionMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [solutionImage, setSolutionImage] = useState('');
  const [animeImage, setAnimeImage] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewSolution = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title,
        title_ar: titleAr,
        description,
        description_ar: descriptionAr,
        solution_image: solutionImage,
        anime_image: animeImage,
      };

      await makeNewSolution({ interface_id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setTitle('');
          setTitleAr('');
          setDescription('');
          setDescriptionAr('');
          setSolutionImage('');
          setAnimeImage('');

          handleClose();
          return refetchInterface();
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

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='create_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Solution',
          ar: 'إنشاء حل جديد',
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
              en: 'Create New Solution',
              ar: 'إنشاء حل جديد',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewSolution(e)}>
            <Row>
              <Col md={6}>
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
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( Ar )
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
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( EN )
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
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( Ar )
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
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Solution {t('identifier_text_name.image')}
                  </FormLabel>
                  <FormControl
                    required
                    type='file'
                    id='uploadSolutionImage'
                    disabled={isLoading}
                    onChange={(e) =>
                      UploadFile('uploadSolutionImage', null, setSolutionImage)
                    }
                  />{' '}
                  <img
                    src={solutionImage}
                    alt='Solution'
                    className='w-100 my-3'
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Anime {t('identifier_text_name.image')}
                  </FormLabel>
                  <FormControl
                    required
                    type='file'
                    id='uploadAnimeImage'
                    disabled={isLoading}
                    onChange={(e) =>
                      UploadFile('uploadAnimeImage', null, setAnimeImage)
                    }
                  />
                  <img src={animeImage} alt='Anime' className='w-100 my-3' />
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

export default CreateSolutionForm;
