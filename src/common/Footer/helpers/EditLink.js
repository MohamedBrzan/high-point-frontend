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
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

import { useUpdateLinkMutation } from '../../../store/apis/Interface/Interface';
import { useEffect } from 'react';

const EditLinkForm = ({ interface_id, link, refetch }) => {
  const { t } = useTranslation();

  const [updateLink, { isLoading }] = useUpdateLinkMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [url, setUrl] = useState('');

  const changeValue = (e) => e.target.value;

  const editLinkData = async (e) => {
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
        await updateLink({ interface_id, link_id: link?._id, ...data }).then(
          (response) => {
            if (response.data) {
              toast.success(t('update_success'), {
                position: 'top-center',
              });

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
          }
        );
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

  useEffect(() => {
    setName(link.name);
    setNameAr(link.name_ar);
    setUrl(link.url);
  }, [link]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_link_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit Link',
          ar: 'تعديل لينك',
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
              en: 'Edit Link',
              ar: 'تعديل لينك',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editLinkData(e)}>
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
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditLinkForm;
