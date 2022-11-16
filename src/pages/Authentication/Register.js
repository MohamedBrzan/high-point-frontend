import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../store/apis/User/User';
import customAvatar from '../../images/avatar.png';
import { createUser } from '../../store/reducers/User/UserSlice';
import { useDispatch } from 'react-redux';
import PageTitle from '../../utils/PageTitle';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(customAvatar);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const changeValue = (e) => e.target.value;

  const uploadAvatar = () => {
    const file = document.getElementById('uploadAvatarImage').files[0];
    const preview = document.getElementById('avatarImagePreview');

    const reader = new FileReader();

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }

    reader.addEventListener(
      'load',
      () => {
        preview.src = reader.result;
        setAvatar(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const register = async (e) => {
    const data = {
      avatar: avatar !== '' ? avatar : customAvatar,
      name,
      email,
      password,
      confirmPassword,
    };

    e.preventDefault();
    try {
      await registerUser({ ...data }).then((response) => {
        if (response.data) {
          dispatch(createUser(response.data.user));
          toast.success('User registered successfully', {
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
      <PageTitle>Register</PageTitle>
      <Row className='auth_content_row'>
        <Col md={6} className='text_col'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='LOGO' className='auth_logo_img' />
            </Link>
          </div>
          <div className='head_text'>
            <div className='first_title'>
              {t('authentication.register.first_title')}
            </div>
            <span className='colored_title'>
              {t('authentication.register.colored_title')}
            </span>
            <span className='last_title'>
              {t('authentication.register.last_title')}
            </span>
          </div>
          <Container fluid={'sm'} className='mt-3'>
            <Form onSubmit={(e) => register(e)}>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.avatar')}</FormLabel>
                <div className='avatar_container'>
                  <FormControl
                    disabled={isLoading}
                    type='file'
                    name='avatar'
                    id='uploadAvatarImage'
                    onChange={uploadAvatar}
                    placeholder={t('authentication.form.name.placeholder')}
                  />
                  <img src={avatar} alt='Avatar.' id='avatarImagePreview'></img>
                </div>
              </FormGroup>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.name.text')}</FormLabel>
                <FormControl
                  disabled={isLoading}
                  required
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => setName(changeValue(e))}
                  placeholder={t('authentication.form.name.placeholder')}
                />
              </FormGroup>
              <FormGroup className='mb-4'>
                <FormLabel>{t('authentication.form.email.text')}</FormLabel>
                <FormControl
                  disabled={isLoading}
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
                {t('authentication.form.register_btn')}
              </Button>
              <Link to='/authentication/login' className='have_account_link'>
                {' '}
                {t('authentication.have_account.register')}
              </Link>
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

export default RegisterPage;
