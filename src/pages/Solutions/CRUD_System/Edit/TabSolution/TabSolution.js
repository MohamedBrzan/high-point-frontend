import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createSolutionSolution } from '../../../../../store/reducers/solutions/Solution';
import TabSolutionForm from './helpers/TabSolutionForm';

const EditSolutionTabSolution = ({ solution }) => {
  const { t } = useTranslation();
  const { solutionSolution } = useSelector((state) => state.solutionSolution);
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
          dispatch(createSolutionSolution(solution));
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
              en: solutionSolution.title,
              ar: solutionSolution.title_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <TabSolutionForm handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default EditSolutionTabSolution;
