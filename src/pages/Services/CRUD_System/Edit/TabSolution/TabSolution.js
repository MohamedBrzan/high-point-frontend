import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceSolution } from '../../../../../store/reducers/services/Solution';
import TabSolutionForm from './helpers/TabSolutionForm';

const EditServiceTabSolution = ({ solution }) => {
  const { t } = useTranslation();
  const { serviceSolution } = useSelector((state) => state.serviceSolution);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        md={6}
        className='action_btn edit_btn item_edit_btn'
        onClick={() => {
          dispatch(createServiceSolution(solution));
          handleShow();
        }}
      >
        <FontAwesomeIcon icon={faEdit} size='2x' />
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
            {t('hpt_page.card.tab.solution.title', {
              en: serviceSolution.title,
              ar: serviceSolution.title_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <TabSolutionForm handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default EditServiceTabSolution;
