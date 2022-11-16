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
import { useUpdateAboutMutation } from '../../../store/apis/About/About';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const EditAboutForm = ({ about, refetchAbout }) => {
  const { t } = useTranslation();
  const [editAbout, { isLoading }] = useUpdateAboutMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [description, setDescription] = useState('');
  const [footerText, setFooterText] = useState('');
  const [footerTextAr, setFooterTextAr] = useState('');
  const [qATitle, setQATitle] = useState('');
  const [qATitleAr, setQATitleAr] = useState('');
  const [teamTitle, setTeamTitle] = useState('');
  const [teamTitleAr, setTeamTitleAr] = useState('');
  const [footerImage, setFooterImage] = useState('');

  const changeValue = (e) => e.target.value;

  function changeFooterImage() {
    const file = document.getElementById('editAboutFooterImage').files[0];

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

  const editAboutData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title,
        title_ar: titleAr,
        description: description,
        description_ar: descriptionAr,
        footer_text: footerText,
        footer_text_ar: footerTextAr,
        q_a: {
          q_a_title: qATitle,
          q_a_title_ar: qATitleAr,
        },
        team: {
          team_title: teamTitle,
          team_title_ar: teamTitleAr,
        },
        footer_image: footerImage,
      };

      await editAbout({ about_id: about._id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('update_success'), {
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
    setTitle(about.title);
    setTitleAr(about.title_ar);
    setDescription(about.description);
    setDescriptionAr(about.description_ar);
    setFooterImage(about.footer_image);
    setFooterText(about.footer_text);
    setFooterTextAr(about.footer_text_ar);
    setQATitle(about.q_a.q_a_title);
    setQATitleAr(about.q_a.q_a_title_ar);
    setTeamTitle(about.team.team_title);
    setTeamTitleAr(about.team.team_title_ar);
  }, [
    about.description,
    about.description_ar,
    about.footer_image,
    about.footer_text,
    about.footer_text_ar,
    about.q_a.q_a_title,
    about.q_a.q_a_title_ar,
    about.team.team_title,
    about.team.team_title_ar,
    about.title,
    about.title_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        className='create_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit About',
          ar: 'تعديل نبذه عنا',
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='3x' />
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
              en: 'Edit About',
              ar: 'تعديل نبذه عنا',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editAboutData(e)}>
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
                {' '}
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
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Q&A {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={qATitle}
                    onChange={(e) => setQATitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Q&A {t('identifier_text_name.title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={qATitleAr}
                    onChange={(e) => setQATitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Team {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={teamTitle}
                    onChange={(e) => setTeamTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Team {t('identifier_text_name.title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={teamTitleAr}
                    onChange={(e) => setTeamTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.image')}
              </FormLabel>
              <FormControl
                required
                disabled={isLoading}
                type='file'
                id='editAboutFooterImage'
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

export default EditAboutForm;
