import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createSolutionTab } from '../../../../../store/reducers/solutions/Tab';
import SolutionTabForm from './helpers/SolutionTabForm';

const EditSolutionTab = ({ tab }) => {
  const { t } = useTranslation();
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
          dispatch(createSolutionTab(tab));
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
            {t('hpt_page.card.tab.title', {
              en: tab.title,
              ar: tab.title_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <SolutionTabForm handleClose={handleClose} tab={tab} />
      </Modal>
    </>
  );
};

export default EditSolutionTab;
