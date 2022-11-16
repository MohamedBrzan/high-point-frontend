import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import {
  useGetAllSolutionsQuery,
  useGetSolutionByIdQuery,
} from '../../../../../store/apis/HptSolutions/HptSolutions';
import CreateSolutionSchemaForm from './helpers/CreateSolutionSchemaForm';
import ServiceSchemaForm from './helpers/SolutionSchemaForm';

const EditService = () => {
  const { t } = useTranslation();
  const {
    data: allSolutions,
    isSuccess,
    isLoading,
    refetch,
  } = useGetAllSolutionsQuery();
  const {
    data: solution,
    isLoading: solutionIsLoading,
    isSuccess: solutionIsSuccess,
    refetch: refetchSolution,
  } = useGetSolutionByIdQuery(
    isSuccess && allSolutions && allSolutions[0] && allSolutions[0]._id
      ? allSolutions[0]._id
      : ''
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div md={6} className='section_edit_btn' onClick={handleShow}>
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
            {t('identifier_text_name.solutions_control')}
          </Modal.Title>
        </Modal.Header>
        {solution && solution._id ? (
          <ServiceSchemaForm
            solution={solution}
            isSuccess={solutionIsSuccess}
            refetch={refetchSolution}
            handleClose={handleClose}
          />
        ) : (
          <CreateSolutionSchemaForm
            isLoading={isLoading}
            refetch={refetch}
            handleClose={handleClose}
          />
        )}
      </Modal>
    </>
  );
};

export default EditService;
