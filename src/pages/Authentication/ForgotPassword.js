import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordMutation } from '../../store/apis/User/User';
import authImage from '../../images/auth.png';
import logo from '../../images/auth_logo.svg';
import './Authentication.css';
import { Link } from 'react-router-dom';
import PageTitle from '../../utils/PageTitle';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sendForgotPasswordLink, { isLoading }] = useForgotPasswordMutation();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await sendForgotPasswordLink({ email }).then((response) => {
        if (response.data) {
          toast.success(t('authentication.form.forgot_password.message'), {
            position: 'top-center',
          });
          navigate('/');
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
    <section className='authentication forgot_password'>
      <PageTitle>Forgot Password</PageTitle>
      <Row className='auth_content_row'>
        <Col md={6} className='text_col'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='LOGO' className='auth_logo_img' />
            </Link>
          </div>
          <div className='head_text'>
            <div className='login_title'>
              {t('authentication.form.forgot_password.text')}
            </div>
          </div>
          <Container fluid={'sm'} className='mt-3'>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.email.text')}</FormLabel>
                <FormControl
                  disabled={isLoading}
                  required
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('authentication.form.email.placeholder')}
                />
              </FormGroup>

              <Button
                disabled={isLoading}
                type='submit'
                className='auth_submit_btn'
              >
                {t('authentication.form.check.text')}
              </Button>
            </Form>
          </Container>
        </Col>
        <Col md={6} className='auth_img_col'>
          <img src={authImage} alt='AUTH_IMAGE' className='auth_img' />
        </Col>
      </Row>
    </section>
  );
};

export default ForgotPassword;

// <section className='authentication forgot-password'>
//   <Row>
//     <Col md={6}>
//       {' '}
//       <div className='logo'>
//         <img src={logo} alt='LOGO' className='auth_logo_img' />
//       </div>
//       <div className='head_text'>
//         <div className='login_title'>{t('authentication.login')}</div>
//       </div>
//       <Form onSubmit={handleSubmit}>
//         <FormGroup className='mb-4'>
//           <FormLabel>{t('authentication.form.email.text')}</FormLabel>
//           <FormControl
//             required
//             type='email'
//             name='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder={t('authentication.form.email.placeholder')}
//           />
//         </FormGroup>

//         <Button
//           disabled={isLoading}
//           type='submit'
//           className='auth_submit_btn'
//         >
//           {t('authentication.form.check.text')}
//         </Button>
//       </Form>
//     </Col>
//     <Col md={6} className='auth_img_col'>
//       <img src={authImage} alt='AUTH_IMAGE' className='auth_img' />
//     </Col>
//   </Row>
// </section>
