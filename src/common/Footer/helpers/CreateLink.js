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
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

import { useCreateLinkMutation } from '../../../store/apis/Interface/Interface';

const CreateLinkForm = ({ interface_id, refetch }) => {
  const { t } = useTranslation();

  const [createNewLink, { isLoading }] = useCreateLinkMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [url, setUrl] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewLinkData = async (e) => {
    try {
      e.preventDefault();
      const linksName = [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'gmail',
        'youtube',
      ];
      const data = {
        name,
        name_ar: nameAr,
        url,
      };
      if (linksName.includes(name)) {
        await createNewLink({ interface_id, ...data }).then((response) => {
          if (response.data) {
            toast.success(t('create_success'), {
              position: 'top-center',
            });

            console.log('yes includes');
            setName('');
            setNameAr('');
            setUrl('');

            handleClose();
            return refetch();
          } else {
            return toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        });
      } else {
        return toast.error(
          t('web_name_not_valid', {
            en: 'please choose another website Name',
            ar: 'هذا الإسم غير مدرج فى قائمة المواقع من فضلك حاول مرة أخرى',
          }),
          {
            position: 'top-center',
          }
        );
      }
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
        className='create_link_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Link',
          ar: 'أنشاء لينك جديد',
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
              en: 'Create New Link',
              ar: 'أنشاء لينك جديد',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewLinkData(e)}>
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
                    {t('identifier_text_name.name')} ( Ar )
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
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.url')}
              </FormLabel>
              <FormControl
                required
                type='url'
                disabled={isLoading}
                value={url}
                onChange={(e) => setUrl(changeValue(e))}
              />
            </FormGroup>
            <Button disabled={isLoading} type='submit'>
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateLinkForm;
