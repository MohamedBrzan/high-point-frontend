import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import {
  useGetAllContactUsQuery,
  useGetContactUsByIdQuery,
} from '../../store/apis/ContactUs/ContactUs';
import './ContactUs.css';
import EditContactUsForm from './helpers/EditContactUsForm';
import CreateContactUsForm from './helpers/CreateContactUsForm';
import { toast } from 'react-toastify';
import { useCreateClientMessageMutation } from '../../store/apis/ClientMessage/ClientMessage';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PageTitle from '../../utils/PageTitle';

const ContactUs = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const { data: allContactUs, isLoading, refetch } = useGetAllContactUsQuery();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [numberOfNetwork, setNumberOfNetwork] = useState('');
  const [networkTraffic, setNetworkTraffic] = useState('');
  const [networkType, setNetworkType] = useState('');
  const [message, setMessage] = useState('');

  const changeValue = (e) => e.target.value;

  const { data: contactUs, refetch: refetchContactUs } =
    useGetContactUsByIdQuery(
      allContactUs && allContactUs[0] && allContactUs[0]._id
        ? allContactUs[0]._id
        : ''
    );
  const [createMessage, { isLoading: uploadingMessage }] =
    useCreateClientMessageMutation();

  const data = {
    name,
    email,
    phone_or_whatsapp: phoneOrWhatsApp,
    company,
    country,
    number_of_network: numberOfNetwork,
    network_traffic: networkTraffic,
    network_type: networkType,
    message,
  };

  const SendMessage = async (e) => {
    try {
      e.preventDefault();
      await createMessage({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setName('');
          setEmail('');
          setPhoneOrWhatsApp('');
          setCompany('');
          setCountry('');
          setNumberOfNetwork('');
          setNetworkTraffic('');
          setNetworkType('');
          setMessage('');
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

  if (isLoading || uploadingMessage) return <CustomSpinner />;

  return (
    <section className='contact_us'>
      {' '}
      <PageTitle>Contact Us</PageTitle>
      {isAdmin ? (
        contactUs && contactUs._id ? (
          <EditContactUsForm
            contactUs={contactUs}
            refetchContactUs={refetchContactUs}
          />
        ) : (
          <CreateContactUsForm refetch={refetch} />
        )
      ) : null}
      <Container>
        <Row className='contact_us__row'>
          {contactUs && contactUs._id && (
            <Col md={6} className='contact_us__title'>
              {t('hpt_page.contact_us_page.info', {
                en: contactUs.title.first_text,
                ar: contactUs.title_ar.first_text_ar,
              })}{' '}
              <br />
              {t('hpt_page.contact_us_page.info', {
                en: contactUs.title.last_text,
                ar: contactUs.title_ar.last_text_ar,
              })}
            </Col>
          )}
          <Col>
            <Form onSubmit={(e) => SendMessage(e)}>
              <FormGroup>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.name')}
                </FormLabel>
                <FormControl
                  type='text'
                  value={name}
                  onChange={(e) => setName(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.email')}
                </FormLabel>
                <FormControl
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.phone_or_whats_app')}
                </FormLabel>
                <FormControl
                  type='number'
                  value={phoneOrWhatsApp}
                  onChange={(e) => setPhoneOrWhatsApp(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.company')}
                </FormLabel>
                <FormControl
                  type='text'
                  value={company}
                  onChange={(e) => setCompany(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.country')}
                </FormLabel>
                <FormControl
                  type='text'
                  value={country}
                  onChange={(e) => setCountry(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>

              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.number_of_network')}
                </FormLabel>
                <FormControl
                  type='number'
                  value={numberOfNetwork}
                  onChange={(e) => setNumberOfNetwork(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.network_traffic')}
                </FormLabel>
                <FormControl
                  type='text'
                  value={networkTraffic}
                  onChange={(e) => setNetworkTraffic(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormLabel className='contact_us__form-label'>
                  {t('hpt_page.contact_us_page.network_type')}
                </FormLabel>
                <FormControl
                  type='text'
                  value={networkType}
                  onChange={(e) => setNetworkType(changeValue(e))}
                  className='contact_us__form-control'
                  required
                  disabled={isLoading}
                />
              </FormGroup>
              <FormGroup className='mb-3'>
                <FormControl
                  as='textarea'
                  value={message}
                  onChange={(e) => setMessage(changeValue(e))}
                  row='5'
                  className='contact_us__form-control'
                  required
                  placeholder={t('hpt_page.contact_us_page.message')}
                  disabled={isLoading}
                />
              </FormGroup>
              <div className='contact_us__btn-container'>
                <Button type='submit' className='contact_us__submit-btn'>
                  {t('hpt_page.contact_us_page.send_message_btn')}
                </Button>
              </div>
            </Form>
            {contactUs && contactUs._id && (
              <Row className='contact_us__info-row'>
                <Col md={6} className='contact_us__info-col'>
                  <div className='head_office mb-3'>
                    <div className='title'>
                      {t('hpt_page.contact_us_page.head_office')}
                    </div>
                    <div>
                      {t('hpt_page.contact_us_page.info', {
                        en: contactUs.head_office.location,
                        ar: contactUs.head_office.location_ar,
                      })}
                    </div>
                    <div>
                      {t('hpt_page.contact_us_page.info', {
                        en: contactUs.head_office.address,
                        ar: contactUs.head_office.address_ar,
                      })}
                    </div>
                  </div>
                  <div className='other_branches mb-3'>
                    <div className='title'>
                      {t('hpt_page.contact_us_page.other_branches')}
                    </div>
                    <div>
                      {' '}
                      {t('hpt_page.contact_us_page.info', {
                        en: contactUs.branches,
                        ar: contactUs.branches_ar,
                      })}
                    </div>
                  </div>
                </Col>
                <Col md={6} className='contact_us__info-col'>
                  <div className='work_inquiries mb-3'>
                    <div className='title'>
                      {t('hpt_page.contact_us_page.work_inquiries')}
                    </div>
                    <div>
                      {t('hpt_page.contact_us_page.info', {
                        en: `${contactUs.work_inquiries.question} ?`,
                        ar: `${contactUs.work_inquiries.question_ar} ?`,
                      })}
                    </div>
                    <div>{contactUs.work_inquiries.company_email} </div>
                  </div>
                  <div className='phone mb-3'>
                    <div className='title'>
                      {t('hpt_page.contact_us_page.phone')}
                    </div>
                    <div>
                      <span> {t('hpt_page.contact_us_page.tel')} : </span>
                      {contactUs.phone.tel}{' '}
                    </div>
                    <div>
                      {' '}
                      <span> {t('hpt_page.contact_us_page.fax')} : </span>
                      {contactUs.phone.fax}{' '}
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
