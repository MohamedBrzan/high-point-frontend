import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import authImage from '../../images/auth.png';
import logo from '../../images/auth_logo.svg';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './Authentication.css';
import { toast } from 'react-toastify';
import { createUser } from '../../store/reducers/User/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  useGoogleLoginUserMutation,
  useLoginUserMutation,
} from '../../store/apis/User/User';
// import GoogleLoginButton from './GoogleLoginButton';
import PageTitle from '../../utils/PageTitle';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const changeValue = (e) => e.target.value;

  const loginUserData = async (e) => {
    const data = {
      email,
      password,
    };
    e.preventDefault();
    try {
      await loginUser({ ...data }).then((response) => {
        if (response.data) {
          dispatch(createUser(response.data.user));
          toast.success('User Login successfully', {
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
    <section className='authentication register'>
      <PageTitle>Login</PageTitle>
      <Row className='auth_content_row'>
        <Col md={6} className='text_col'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='LOGO' className='auth_logo_img' />
            </Link>
          </div>
          <div className='head_text'>
            <div className='login_title'>{t('authentication.login')}</div>
          </div>
          <Container fluid={'sm'} className='mt-3'>
            <Form onSubmit={(e) => loginUserData(e)}>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.email.text')}</FormLabel>
                <FormControl
                  disabled={isLoading}
                  // disabled={isLoading || userLogging}
                  required
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(changeValue(e))}
                  placeholder={t('authentication.form.email.placeholder')}
                />
              </FormGroup>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.password.text')}</FormLabel>
                <FormControl
                  disabled={isLoading}
                  // disabled={isLoading || userLogging}
                  required
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(changeValue(e))}
                  placeholder={t('authentication.form.password.placeholder')}
                />
              </FormGroup>

              <Button
                disabled={isLoading}
                // disabled={isLoading || userLogging}
                type='submit'
                className='auth_submit_btn'
              >
                {t('authentication.form.login_btn')}
              </Button>
              <p className='text-center my-3'>{t('or_text')}</p>

              {/* <GoogleLoginButton
              // googleLogin={googleLogin}
              /> */}

              <Row>
                <Col>
                  <Link
                    to='/authentication/register'
                    className='have_account_link'
                  >
                    {t('authentication.have_account.login')}
                  </Link>
                </Col>
                <Col>
                  <Link
                    to='/authentication/forgot_password'
                    className='have_account_link'
                  >
                    {t('authentication.forgot_password')}
                  </Link>
                </Col>
              </Row>
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

export default LoginPage;
