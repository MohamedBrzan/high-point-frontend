import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import authImage from '../../images/auth.png';
import logo from '../../images/auth_logo.svg';
import { createUser } from '../../store/reducers/User/UserSlice';
import { toast } from 'react-toastify';

import './Authentication.css';
import { Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResetPasswordMutation } from '../../store/apis/User/User';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PageTitle from '../../utils/PageTitle';

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeValue = (e) => e.target.value;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetUserPassword, { isLoading }] = useResetPasswordMutation();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    try {
      const data = {
        password,
        confirmPassword,
        user_id: id,
      };
      e.preventDefault();
      await resetUserPassword({ ...data }).then((response) => {
        if (response.data) {
          dispatch(createUser(response.data.user));
          toast.success(t('authentication.form.reset_password.message'), {
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
    <section className='authentication reset_password'>
      <PageTitle>Reset Password</PageTitle>
      <Row className='auth_content_row'>
        <Col md={6} className='text_col'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='LOGO' className='auth_logo_img' />
            </Link>
          </div>
          <div className='head_text'>
            <div className='login_title'>
              {t('authentication.form.reset_password.text')}
            </div>
          </div>
          <Container fluid={'sm'} className='mt-3'>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.password.text')}</FormLabel>
                <FormControl
                  disabled={isLoading}
                  required
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(changeValue(e))}
                  placeholder={t('authentication.form.password.placeholder')}
                />
              </FormGroup>
              <FormGroup className='mb-4'>
                <FormLabel>
                  {t('authentication.form.confirm_password.text')}
                </FormLabel>
                <FormControl
                  disabled={isLoading}
                  required
                  type='password'
                  name='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(changeValue(e))}
                  placeholder={t(
                    'authentication.form.confirm_password.placeholder'
                  )}
                />
              </FormGroup>

              <Button
                disabled={isLoading}
                type='submit'
                className='auth_submit_btn'
              >
                {t('authentication.form.reset_password.text')}
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

export default ResetPassword;
