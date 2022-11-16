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
import { useUpdateSolutionMutation } from '../../../../store/apis/Interface/Interface';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import UploadFile from '../../../../functions/UploadFile';
import { useEffect } from 'react';

const EditSolutionForm = ({ interface_id, solution, refetchInterface }) => {
  const { t } = useTranslation();
  const [updateSolution, { isLoading }] = useUpdateSolutionMutation();

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

  const editSolution = async (e) => {
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

      await updateSolution({
        interface_id,
        solution_id: solution._id,
        ...data,
      }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

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

  useEffect(() => {
    setTitle(solution.title);
    setTitleAr(solution.title_ar);
    setDescription(solution.description);
    setDescriptionAr(solution.description_ar);
    setSolutionImage(solution.solution_image);
    setAnimeImage(solution.anime_image);
  }, [
    solution.anime_image,
    solution.description,
    solution.description_ar,
    solution.solution_image,
    solution.title,
    solution.title_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Solution',
          ar: 'إنشاء حل جديد',
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
              en: 'Create New Solution',
              ar: 'إنشاء حل جديد',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editSolution(e)}>
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
                    type='file'
                    id='editSolutionImage'
                    disabled={isLoading}
                    onChange={(e) =>
                      UploadFile('editSolutionImage', null, setSolutionImage)
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
                    type='file'
                    id='editAnimeImage'
                    disabled={isLoading}
                    onChange={(e) =>
                      UploadFile('editAnimeImage', null, setAnimeImage)
                    }
                  />
                  <img src={animeImage} alt='Anime' className='w-100 my-3' />
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

export default EditSolutionForm;
