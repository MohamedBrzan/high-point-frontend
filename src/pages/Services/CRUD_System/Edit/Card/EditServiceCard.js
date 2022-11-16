import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceCard } from '../../../../../store/reducers/services/Card';
import ServiceCardForm from './helpers/ServiceCardForm';

const EditServiceCard = ({ card }) => {
  const { t } = useTranslation();
  const { serviceCard } = useSelector((state) => state.serviceCard);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        md={6}
        className='item_edit_btn'
        onClick={() => {
          dispatch(createServiceCard(card));
          handleShow();
        }}
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
              en: serviceCard.title,
              ar: serviceCard.title_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <ServiceCardForm handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default EditServiceCard;
