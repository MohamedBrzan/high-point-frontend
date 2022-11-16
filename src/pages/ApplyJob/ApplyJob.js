import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import { useTranslation } from 'react-i18next';
import { useCreateApplyJobMutation } from '../../store/apis/ApplyJob/ApplyJob';
import arrow from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import './ApplyJob.css';
import { toast } from 'react-toastify';
import StyledButton from '../../common/StyledButton/StyledButton';
import PageTitle from '../../utils/PageTitle';

const ApplyJob = () => {
  const { t, i18n } = useTranslation();

  const [createApplication, { isLoading }] = useCreateApplyJobMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const changeValue = (e) => e.target.value;

  const uploadFile = () => {
    const file = document.getElementById('uploadMessageOrCVFile').files[0];

    if (file.size > 10485760) {
      return toast.error(t('file_too_large_10mb'), {
        position: 'top-center',
      });
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setMessage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const data = {
    name,
    email,
    phone: phone,
    file: message,
  };

  const SendMessage = async (e) => {
    try {
      e.preventDefault();
      await createApplication({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          setName('');
          setEmail('');
          setPhone('');
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

  return (
    <section className='apply_form'>
      <PageTitle>Apply Job</PageTitle>
      <div className='form_section'>
        <div className='title'>
          <div>
            {' '}
            {t('hpt_page.apply_job_page.title', {
              en: 'Ready To',
              ar: 'مستعد لــ',
            })}
          </div>
          <div>
            {' '}
            {t('hpt_page.apply_job_page.title', {
              en: 'Start Your',
              ar: 'بدايـــــة',
            })}
          </div>
          <div>
            {' '}
            {t('hpt_page.apply_job_page.title', {
              en: 'Carrer At HTP',
              ar: 'مسارك المهنى فى هاى بوينت تكنولوجى',
            })}
          </div>
        </div>
        <div className='sub_title'>
          <div className='arrow_container'>
            {' '}
            {i18n.language === 'en' ? (
              <img src={arrow} alt='ARROW_IMG' className='arrow_img' />
            ) : (
              <img src={arrowAr} alt='ARROW_IMG' className='arrow_img' />
            )}
          </div>{' '}
          {t('hpt_page.apply_job_page.sub_title', {
            en: 'We Offer A Lot Of Goodies For You To Enjoy Your Work',
            ar: 'نحن نقدم لك الكثير من الأشياء الجيدة لتستمتع بعملك',
          })}
        </div>
        <Form onSubmit={(e) => SendMessage(e)}>
          <FormGroup>
            <FormLabel className='apply_job__form-label'>
              {t('hpt_page.apply_job_page.name')}
            </FormLabel>
            <FormControl
              type='text'
              value={name}
              onChange={(e) => setName(changeValue(e))}
              className='apply_job__form-control'
              required
              disabled={isLoading}
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormLabel className='apply_job__form-label'>
              {t('hpt_page.apply_job_page.email')}
            </FormLabel>
            <FormControl
              type='email'
              value={email}
              onChange={(e) => setEmail(changeValue(e))}
              className='apply_job__form-control'
              required
              disabled={isLoading}
            />
          </FormGroup>
          <FormGroup className='mb-3'>
            <FormLabel className='apply_job__form-label'>
              {t('hpt_page.apply_job_page.phone')}
            </FormLabel>
            <FormControl
              type='number'
              value={phone}
              onChange={(e) => setPhone(changeValue(e))}
              className='apply_job__form-control'
              required
              disabled={isLoading}
            />
          </FormGroup>{' '}
          <FormLabel className='apply_job__form-label'>
            {t('hpt_page.apply_job_page.message')}
          </FormLabel>
          <div className='file_style'>
            <FormGroup className='mb-3'>
              <div className='order_text'>
                {t('hpt_page.apply_job_page.attach_file')}
              </div>
              <div className='file_rule'>
                {t('hpt_page.apply_job_page.file_rule')}
              </div>
              <FormControl
                type='file'
                id='uploadMessageOrCVFile'
                onChange={uploadFile}
                className='apply_job__form-control file_input'
                required
                disabled={isLoading}
              />
            </FormGroup>
          </div>
          <div className='apply_job__btn-container'>
            <button type='submit' className='apply_job__submit-btn'>
              {' '}
              {i18n.language === 'en' ? (
                <StyledButton
                  color={'white'}
                  borderColor={'white'}
                  borderRightWidth={'.1em'}
                  borderRightColor={'white'}
                >
                  {t('hpt_page.apply_job_page.send_message_btn')}
                </StyledButton>
              ) : (
                <StyledButton
                  color={'white'}
                  borderColor={'white'}
                  borderLeftWidth={'.1em'}
                  borderLeftColor={'white'}
                  iconDir='rtl'
                >
                  {t('hpt_page.apply_job_page.send_message_btn')}
                </StyledButton>
              )}
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ApplyJob;
