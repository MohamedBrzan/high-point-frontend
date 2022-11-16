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
import { useUpdateProofMutation } from '../../../../store/apis/Interface/Interface';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';
import UploadFile from '../../../../functions/UploadFile';
import { useEffect } from 'react';

const EditProofForm = ({ interface_id, proof, refetchInterface }) => {
  const { t } = useTranslation();
  const [updateProof, { isLoading }] = useUpdateProofMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState('');
  const [explain, setExplain] = useState('');

  const changeValue = (e) => e.target.value;

  const updateProofData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        image,
        explain,
      };

      await updateProof({ interface_id, proof_id: proof._id, ...data }).then(
        (response) => {
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
        }
      );
    } catch (error) {
      return toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    setImage(proof.image);
    setExplain(proof.explain);
  }, [proof.explain, proof.image]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit Proof',
          ar: 'تعديل إثبات',
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
              en: 'Edit Proof',
              ar: 'تعديل إثبات',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => updateProofData(e)}>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.image')}
              </FormLabel>
              <FormControl
                id='editProofImage'
                type='file'
                disabled={isLoading}
                onChange={() => UploadFile('editProofImage', null, setImage)}
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
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProofForm;
