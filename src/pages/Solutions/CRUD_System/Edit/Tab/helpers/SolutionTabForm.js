import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import {
  useGetAllServicesTabsQuery,
  useGetServiceTabByIdQuery,
  useUpdateServiceTabMutation,
} from '../../../../../../store/apis/ServicesTabs/ServicesTabs';
import { useTranslation } from 'react-i18next';
import CustomSpinner from '../../../../../../utils/CustomSpinner/CustomSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceTab } from '../../../../../../store/reducers/services/Tab';
import { useGetAllServicesCardQuery } from '../../../../../../store/apis/ServicesCard/ServicesCard';

const ServiceTabForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const { refetch } = useGetAllServicesCardQuery();
  const [updateTab] = useUpdateServiceTabMutation();
  const { serviceTab } = useSelector((state) => state.serviceTab);
  const { data, isLoading } = useGetServiceTabByIdQuery(
    serviceTab._id && serviceTab._id
  );

  const dispatch = useDispatch();

  const changeValue = (e) => e.target.value;

  const [titleEn, setTitleEn] = useState(serviceTab.title);
  const [titleAr, setTitleAr] = useState(serviceTab.title_ar);

  const updateTabData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title: titleEn,
        title_ar: titleAr,
      };
      await updateTab({ tab_id: serviceTab._id, ...data }).then((response) => {
        if (response.data) {
          dispatch(createServiceTab(response.data));
          toast.success(t('update_success'), {
            position: 'top-center',
          });
          refetch();
          handleClose();
          document.querySelectorAll('.card_tab').forEach((card_tab) => {
            card_tab.classList.remove('active');
          });
        } else {
          toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  if (isLoading) return <CustomSpinner />;
  return (
    <section className='service_schema_form'>
      <Form onSubmit={(e) => updateTabData(e)}>
        <Row className='p-2 my-2'>
          <FormGroup>
            <FormLabel className='head_label'>
              {t('identifier_text_name.title')}
            </FormLabel>{' '}
            <div className='p-2'>
              <FormLabel>{t('identifier_text_name.text')} ( EN )</FormLabel>
              <FormControl
                required
                type='text'
                value={titleEn}
                onChange={(e) => setTitleEn(changeValue(e))}
              />
            </div>
            <div className='p-2'>
              <FormLabel>{t('identifier_text_name.text')} ( AR )</FormLabel>
              <FormControl
                required
                type='text'
                value={titleAr}
                onChange={(e) => setTitleAr(changeValue(e))}
              />
            </div>
          </FormGroup>
        </Row>
        <Button className='m-2 p-3 submit_btn' type='submit'>
          {t('save_btn')}
        </Button>
      </Form>
    </section>
  );
};

export default ServiceTabForm;
