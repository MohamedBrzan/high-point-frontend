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
import { useCreateProofMutation } from '../../../../store/apis/Interface/Interface';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import UploadFile from '../../../../functions/UploadFile';

const CreateProofForm = ({ interface_id, refetchInterface }) => {
  const { t } = useTranslation();
  const [makeNewProof, { isLoading }] = useCreateProofMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState('');
  const [explain, setExplain] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewProof = async (e) => {
    try {
      e.preventDefault();
      const data = {
        image,
        explain,
      };

      await makeNewProof({ interface_id, ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setImage('');
          setExplain('');

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
          en: 'Create New Proof',
          ar: 'إنشاء إثبات حديد',
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
              en: 'Create New Proof',
              ar: 'إنشاء إثبات حديد',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewProof(e)}>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.image')}
              </FormLabel>
              <FormControl
                required
                id='uploadProofImage'
                type='file'
                disabled={isLoading}
                onChange={() => UploadFile('uploadProofImage', null, setImage)}
              />
              <img src={image} alt='' className='w-100 my-3' />
            </FormGroup>

            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.description')}
              </FormLabel>
              <FormControl
                required
                disabled={isLoading}
                value={explain}
                onChange={(e) => setExplain(changeValue(e))}
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

export default CreateProofForm;
