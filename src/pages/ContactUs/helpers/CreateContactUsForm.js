import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
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
import { useCreateContactUsMutation } from '../../../store/apis/ContactUs/ContactUs';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const CreateContactUsForm = ({ refetch }) => {
  const { t } = useTranslation();

  const [makeNewContactUs, { isLoading }] = useCreateContactUsMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstText, setFirstText] = useState('');
  const [firstTextAr, setFirstTextAr] = useState('');
  const [lastText, setLastText] = useState('');
  const [lastTextAr, setLastTextAr] = useState('');
  const [location, setLocation] = useState('');
  const [locationAr, setLocationAr] = useState('');
  const [branches, setBranches] = useState('');
  const [branchesAr, setBranchesAr] = useState('');
  const [address, setAddress] = useState('');
  const [addressAr, setAddressAr] = useState('');
  const [question, setQuestion] = useState('');
  const [questionAr, setQuestionAr] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [tel, setTel] = useState('');
  const [fax, setFax] = useState('');

  const changeValue = (e) => e.target.value;

  const createContactUs = async (e) => {
    try {
      const data = {
        first_text: firstText,
        last_text: lastText,
        first_text_ar: firstTextAr,
        last_text_ar: lastTextAr,
        location: location,
        location_ar: locationAr,
        branches,
        branches_ar: branchesAr,
        address: address,
        address_ar: addressAr,
        question: question,
        question_ar: questionAr,
        company_email: companyEmail,
        tel,
        fax,
      };
      e.preventDefault();
      await makeNewContactUs({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('update_success'), {
            position: 'top-center',
          });
          handleClose();
          refetch();
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
    <>
      <div
        md={6}
        className='create_btn'
        onClick={() => {
          handleShow();
        }}
        title={t('hpt_page.card.title', {
          en: `Create a new Contact Us`,
          ar: 'إنشاء التواصل',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='1x' />
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
            {t('hpt_page.title.first_text', {
              en: 'Create a new Contact Us',
              ar: 'إنشاء التواصل',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createContactUs(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={firstText}
                    onChange={(e) => setFirstText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={firstTextAr}
                    onChange={(e) => setFirstTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.title.last_text', {
                      en: 'Last Text',
                      ar: 'النص الأخير',
                    })}{' '}
                    ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={lastText}
                    onChange={(e) => setLastText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.title.last_text', {
                      en: 'Last Text',
                      ar: 'النص الأخير',
                    })}{' '}
                    ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={lastTextAr}
                    onChange={(e) => setLastTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.location')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={location}
                    onChange={(e) => setLocation(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.location')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={locationAr}
                    onChange={(e) => setLocationAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.address')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={address}
                    onChange={(e) => setAddress(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.address')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={addressAr}
                    onChange={(e) => setAddressAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.branches')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={branches}
                    onChange={(e) => setBranches(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.branches')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={branchesAr}
                    onChange={(e) => setBranchesAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.question')} ( EN )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={question}
                    onChange={(e) => setQuestion(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.question')} ( AR )
                  </FormLabel>
                  <FormControl
                    disabled={isLoading}
                    value={questionAr}
                    onChange={(e) => setQuestionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.tel')} ( EN )
                  </FormLabel>
                  <FormControl
                    type='number'
                    disabled={isLoading}
                    value={tel}
                    onChange={(e) => setTel(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.fax')} ( AR )
                  </FormLabel>
                  <FormControl
                    type='number'
                    disabled={isLoading}
                    value={fax}
                    onChange={(e) => setFax(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.company_email')} ( EN )
                  </FormLabel>
                  <FormControl
                    type='email'
                    disabled={isLoading}
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button disabled={isLoading} type='submit'>
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateContactUsForm;
