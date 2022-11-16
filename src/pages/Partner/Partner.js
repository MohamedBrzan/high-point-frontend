import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import './Partner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  useDeletePartnerMutation,
  useGetAllPartnersQuery,
} from '../../store/apis/Partner/Partner';
import CreatePartnerForm from './helpers/CreatePartnerForm';
import EditPartnerForm from './helpers/EditPartnerForm';
import { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RemoveItem from '../../functions/RemoveItem';
import PageTitle from '../../utils/PageTitle';

const Partner = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const {
    data: partners,
    isLoading,
    refetch,
  } = useGetAllPartnersQuery(`${query}`);

  const [deletePartner, { isLoading: deleting }] = useDeletePartnerMutation();

  const changeActiveTab = (e) => {
    const allTabs = document.querySelectorAll('.partner .tabs .tab');
    allTabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    e.target.classList.add('active');
    setQuery(`continent=${e.target.getAttribute('data-tab')}`);
  };

  if (isLoading || deleting) return <CustomSpinner />;

  return (
    <section className='partner'>
      {' '}
      <PageTitle>Partners</PageTitle>
      {isAdmin ? <CreatePartnerForm refetch={refetch} /> : null}
      <Row>
        <Col md={4}>
          {' '}
          <div className='title'>{t('hpt_page.partners_page.title')}</div>
        </Col>
        <Col md={8}>
          <FormControl
            value={search}
            className='border-top-0 border-end-0 border-start-0 p-4 fs-3 mb-3'
            placeholder={t('hpt_page.card.title', {
              en: 'Search By Country',
              ar: 'إبحث عن طريق الدولة',
            })}
            onChange={(e) => {
              setSearch(e.target.value);
              setQuery(`country=${e.target.value}`);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4}></Col>
        <Col md={8}>
          <Row className='tabs'>
            <Col
              xs={12}
              md={2}
              className='tab mb-3'
              data-tab='WORLD'
              onClick={(e) => changeActiveTab(e)}
            >
              WORLD
            </Col>
            <Col
              xs={12}
              md={2}
              className='tab mb-3'
              data-tab='AFRICA'
              onClick={(e) => changeActiveTab(e)}
            >
              AFRICA
            </Col>
            <Col
              xs={12}
              md={2}
              className='tab mb-3'
              data-tab='AMERICAS'
              onClick={(e) => changeActiveTab(e)}
            >
              AMERICAS
            </Col>
            <Col
              xs={12}
              md={2}
              className='tab mb-3'
              data-tab='ASIA'
              onClick={(e) => changeActiveTab(e)}
            >
              ASIA
            </Col>
            <Col
              xs={12}
              md={2}
              className='tab mb-3'
              data-tab='EUROPE'
              onClick={(e) => changeActiveTab(e)}
            >
              EUROPE
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={4} className='partner_length'>
          <span>{partners.length}</span>{' '}
          {t('hpt_page.card.title', {
            en: 'Partners Found',
            ar: 'شركائنا الحاليين',
          })}{' '}
        </Col>
        <Col md={8} className='p-3'>
          <Row>
            {' '}
            {partners &&
              partners.map((partner, index) => (
                <Col
                  md={4}
                  lg={3}
                  key={index}
                  className='card_col mb-3'
                  data-country-ar={partner.country_ar}
                  data-country={partner.country}
                >
                  <Card>
                    {isAdmin ? (
                      <>
                        <div
                          className='delete_btn'
                          onClick={() => {
                            RemoveItem(
                              'partner',
                              deletePartner,
                              partner._id,
                              refetch
                            );
                          }}
                          title={t('hpt_page.card.title', {
                            en: `Delete ${partner.name}`,
                            ar: `حذف ${partner.name_ar}`,
                          })}
                        >
                          <FontAwesomeIcon icon={faTrash} size='1x' />
                        </div>
                        <EditPartnerForm
                          partnerData={partner}
                          refetch={refetch}
                        />
                      </>
                    ) : null}
                    <Card.Img src={partner.image} />
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default Partner;
