import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetAllServicesCardQuery } from '../../../../store/apis/ServicesCard/ServicesCard';
import { useCreateServiceTabMutation } from '../../../../store/apis/ServicesTabs/ServicesTabs';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const CreateServiceTab = ({ card_id }) => {
  const { t } = useTranslation();
  const { refetch } = useGetAllServicesCardQuery();
  const [createTab, { isLoading: creating }] = useCreateServiceTabMutation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeValue = (e) => e.target.value;

  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');

  const createNewCard = async (e) => {
    try {
      e.preventDefault();

      if (!validator.isMongoId(card_id)) {
        return toast.error(t('error.card_id_error'), {
          position: 'top-center',
        });
      } else if (titleEn === '') {
        return toast.error(t('error.title'), {
          position: 'top-center',
        });
      } else if (titleAr === '') {
        return toast.error(t('error.title'), {
          position: 'top-center',
        });
      }

      const data = {
        card_id,
        title: titleEn,
        title_ar: titleAr,
      };

      await createTab({ ...data })
        .then((response) => {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setTitleEn('');
          setTitleAr('');
          refetch();
          handleClose();
        })
        .catch((error) =>
          toast.error(error.message, {
            position: 'top-center',
          })
        );
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='service_schema_form'>
      <div
        md={6}
        className='item_create_tab_btn'
        onClick={handleShow}
        title={t('create.tab')}
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
        <Modal.Header className='title' closeButton>
          <Modal.Title>{t('create.tab')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => createNewCard(e)}>
          <Modal.Body>
            {' '}
            <FormGroup className='mb-3'>
              <FormLabel className='text-light'>
                {t('identifier_text_name.title')} ( EN ) :{' '}
              </FormLabel>
              <FormControl
                type='text'
                value={titleEn}
                onChange={(e) => setTitleEn(changeValue(e))}
                placeholder={t('placeholder.title')}
              />
            </FormGroup>{' '}
            <FormGroup className='mb-3'>
              <FormLabel className='text-light'>
                {t('identifier_text_name.title')} ( AR ) :{' '}
              </FormLabel>
              <FormControl
                type='text'
                value={titleAr}
                onChange={(e) => setTitleAr(changeValue(e))}
                placeholder={t('placeholder.title_ar')}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='m-2 p-3 submit_btn'
              disabled={creating}
              type='submit'
            >
              {t('create_btn')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateServiceTab;
