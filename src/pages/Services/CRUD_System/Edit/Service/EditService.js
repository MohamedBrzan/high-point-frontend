import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
} from '../../../../../store/apis/HptServices/HptServices';
import CreateServiceSchemaForm from './helpers/CreateServiceSchemaForm';
import ServiceSchemaForm from './helpers/ServiceSchemaForm';

const EditService = () => {
  const { t } = useTranslation();
  const {
    data: allServices,
    isSuccess,
    isLoading,
    refetch,
  } = useGetAllServicesQuery();
  const {
    data: service,
    isLoading: serviceIsLoading,
    isSuccess: serviceIsSuccess,
    refetch: refetchService,
  } = useGetServiceByIdQuery(
    isSuccess &&
      allServices &&
      allServices[0] &&
      allServices[0]._id &&
      allServices[0]._id
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div md={6} className='section_edit_btn' onClick={handleShow}>
        <FontAwesomeIcon icon={!service ? faCirclePlus : faEdit} size='2x' />
      </div>

      <Modal
        show={show}
        // fullscreen={true}
        size='xl'
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t('identifier_text_name.services_control')}
          </Modal.Title>
        </Modal.Header>
        {service && service._id ? (
          <ServiceSchemaForm
            serviceIsLoading={serviceIsLoading}
            service={service}
            isSuccess={serviceIsSuccess}
            refetch={refetchService}
            handleClose={handleClose}
          />
        ) : (
          <CreateServiceSchemaForm
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
