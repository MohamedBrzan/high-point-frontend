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
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import { useCreateMissionMutation } from '../../../../store/apis/About/About';

const CreateMissionForm = ({ about, refetchAbout }) => {
  const { t } = useTranslation();
  const [makeNewMission, { isLoading }] = useCreateMissionMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [missionTitle, setMissionTitle] = useState('');
  const [missionTitleAr, setMissionTitleAr] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [missionDescriptionAr, setMissionDescriptionAr] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewMission = async (e) => {
    try {
      e.preventDefault();
      const data = {
        mission_title: missionTitle,
        mission_title_ar: missionTitleAr,
        mission_description: missionDescription,
        mission_description_ar: missionDescriptionAr,
      };

      await makeNewMission({ about_id: about._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('create_success'), {
              position: 'top-center',
            });

            setMissionTitle('');
            setMissionTitleAr('');
            setMissionDescription('');
            setMissionDescriptionAr('');

            handleClose();
            return refetchAbout();
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
        className='create_section_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Mission',
          ar: 'أنشاء مهمة جديدة',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='1x' />
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
              en: 'Create New Mission',
              ar: 'أنشاء مهمة جديدة',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewMission(e)}>
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
                    value={missionTitle}
                    onChange={(e) => setMissionTitle(changeValue(e))}
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
                    value={missionTitleAr}
                    onChange={(e) => setMissionTitleAr(changeValue(e))}
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
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={missionDescription}
                    onChange={(e) => setMissionDescription(changeValue(e))}
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
                    value={missionDescriptionAr}
                    onChange={(e) => setMissionDescriptionAr(changeValue(e))}
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

export default CreateMissionForm;
