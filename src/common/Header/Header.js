import Cookies from 'js-cookie';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../images/logo.png';
import arabicImage from '../../images/arabic_img.svg';
import englishImage from '../../images/english_img.svg';
import docsImage from '../../images/docs_img.svg';
import './Header.css';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../../store/apis/User/User';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createUser } from '../../store/reducers/User/UserSlice';
import { useLocation } from 'react-router-dom';
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '../../store/apis/Product/Product';
import CreateProductForm from '../../pages/Product/helpers/CreateProductForm';
import axios from 'axios';

const Header = () => {
  const headerRef = useRef();
  const [logoutUser] = useLogoutUserMutation();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const path = location.pathname;
  const checkPath = path.split('/');

  const { data: products, isLoading, refetch } = useGetAllProductsQuery();
  const [deleteProduct, { data }] = useDeleteProductMutation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguageCode = Cookies.get('i18next') || 'en';
  if (cookies.get('i18next') === 'ar') {
    document
      .querySelectorAll('.main-link a')
      .forEach((link) => (link.style.fontSize = '1.5em'));
  } else {
    document
      .querySelectorAll('.main-link a')
      .forEach((link) => (link.style.fontSize = '1em'));
  }

  const languages = [
    {
      code: 'en',
      name: 'English',
      dir: 'ltr',
      image: englishImage,
    },
    {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      image: arabicImage,
    },
  ];

  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const logout = async () => {
    try {
      await logoutUser();
      dispatch(createUser({}));
      navigate('/');
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  const removeProduct = async (product_id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const checkIfTrue = confirm(t('delete.delete_product_confirm'));
      if (checkIfTrue === true) {
        await deleteProduct(product_id).then((response) => {
          if (response.data) {
            toast.success(response.data.message, {
              position: 'top-center',
            });

            refetch();
            navigate('/');
          } else {
            toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
    if (i18n.language === 'ar') {
      document.body.style.fontFamily = 'Cairo, sans-serif !important';
      document.querySelectorAll('div').forEach((div) => {
        div.style.fontFamily = 'Cairo, sans-serif';
      });
    }
    if (i18n.language === 'en') {
      document.body.style.fontFamily = 'myFirstFont';
      document
        .querySelectorAll('div')
        .forEach((div) => (div.style.fontFamily = 'myFirstFont'));
    }

    axios.defaults.headers.post['Accept-Language'] = i18n.language;

    // if (
    //   path.includes('blogs') ||
    //   path.includes('news_room') ||
    //   path.includes('partner') ||
    //   path.includes('about') ||
    //   path.includes('career')
    // ) {
    //   if (document.querySelectorAll('.main-link a')) {
    //     document
    //       .querySelectorAll('.main-link a')
    //       .forEach((link) => link.classList.add('main_color'));
    //   }
    //   if (document.querySelector('.row.user_row')) {
    //     document.querySelector('.row.user_row').classList.add('main_color');
    //   }
    //   if (document.querySelector('.login-btn')) {
    //     document.querySelector('.login-btn').classList.add('main_color');
    //   }
    //   if (document.querySelector('.user_drop_links')) {
    //     document.querySelector('.user_drop_links').classList.add('main_color');
    //   }
    // } else {
    //   if (document.querySelectorAll('.main-link a')) {
    //     document
    //       .querySelectorAll('.main-link a')
    //       .forEach((link) => link.classList.remove('main_color'));
    //   }
    //   if (document.querySelector('.row.user_row')) {
    //     document.querySelector('.row.user_row').classList.remove('main_color');
    //   }
    //   if (document.querySelector('.login-btn')) {
    //     document.querySelector('.login-btn').classList.remove('main_color');
    //   }
    //   if (document.querySelector('.user_drop_links')) {
    //     document
    //       .querySelector('.user_drop_links')
    //       .classList.remove('main_color');
    //   }
    // }
  }, [currentLanguage.dir, i18n.language, path]);

  return (
    <header id='header' ref={headerRef}>
      {isAdmin ? (
        checkPath[1] === '' ? (
          <CreateProductForm refetch={refetch} />
        ) : (
          ''
        )
      ) : null}

      <Navbar collapseOnSelect expand='xl'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>
              <img src={logo} alt='Logo.' />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              <div className='main-link'>
                <LinkContainer to='/'>
                  <Nav.Link>
                    <span className='nav-text'>{t('header.home')}</span>
                  </Nav.Link>
                </LinkContainer>
              </div>
              <div className='main-link'>
                <LinkContainer to='/hpt-services'>
                  <Nav.Link>
                    <span className='nav-text'>{t('header.services')}</span>
                  </Nav.Link>
                </LinkContainer>
              </div>
              <div className='main-link'>
                <LinkContainer to='/hpt-solutions'>
                  <Nav.Link>
                    {' '}
                    <span className='nav-text'>{t('header.solutions')}</span>
                  </Nav.Link>
                </LinkContainer>
              </div>

              <div className='main-link'>
                <Nav.Link className='products'>
                  <span className='nav-text'>{t('header.products')}</span>{' '}
                  <FontAwesomeIcon
                    icon={faAnglesDown}
                    size='sm'
                    className='angle-arrows-icon'
                  />{' '}
                  <Row className='drop-menu'>
                    {' '}
                    {products && products.length > 0
                      ? products.map(
                          ({ _id, title, title_ar, image }, index) => (
                            <LinkContainer
                              to={`/product/${index}`}
                              onClick={() =>
                                window.scrollTo({
                                  top: 0,
                                  behavior: 'smooth',
                                })
                              }
                              key={index}
                            >
                              <Col md={6} className='product_item'>
                                <div className='drop-item'>
                                  <Row>
                                    <Col
                                      xs={12}
                                      md={3}
                                      className='square-show'
                                    ></Col>{' '}
                                    <Col className='drop-item-text'>
                                      {t('hpt_page.product_page.title', {
                                        en: title,
                                        ar: title_ar,
                                      })}
                                    </Col>
                                  </Row>
                                </div>
                                <div
                                  className='delete_icon'
                                  title={t('hpt_page.product_page.title', {
                                    en: 'Delete ' + title,
                                    ar: 'حذف ' + title_ar,
                                  })}
                                  onClick={() => removeProduct(_id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} size='1x' />
                                </div>
                              </Col>
                            </LinkContainer>
                          )
                        )
                      : null}
                    <LinkContainer to='/documentation'>
                      <div className='docs'>
                        <div className='docs-icon'>
                          <picture>
                            <img src={docsImage} alt='Documentation.' />
                          </picture>
                        </div>
                        <div className='docs-text'>
                          {t('hpt_page.documentation_page.title')}
                        </div>
                      </div>
                    </LinkContainer>
                  </Row>
                </Nav.Link>
              </div>
              <div className='main-link'>
                <LinkContainer to='/contact_us'>
                  <Nav.Link>
                    <span className='nav-text'>{t('header.contact_us')}</span>
                  </Nav.Link>
                </LinkContainer>
              </div>
            </Nav>

            <Nav>
              <div className='main-link lang'>
                {languages &&
                  languages.map(({ code, name, image }, index) => (
                    <div
                      className={code === currentLanguageCode ? 'd-none' : ''}
                      title={name}
                      key={index}
                      onClick={() => {
                        i18n.changeLanguage(code);
                        window.localStorage.setItem('i18nextLng', code);
                        cookies.set('i18next', code);

                        if (i18n.language === 'ar') {
                          document.body.style.fontFamily =
                            'Cairo, sans-serif !important';
                          document.querySelectorAll('div').forEach((div) => {
                            div.style.fontFamily = 'Cairo, sans-serif';
                          });
                        }
                        if (i18n.language === 'en') {
                          document.body.style.fontFamily = 'myFirstFont';
                          document
                            .querySelectorAll('div')
                            .forEach(
                              (div) => (div.style.fontFamily = 'myFirstFont')
                            );
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <picture>
                        <img src={image} alt={name} className='lang_img' />
                      </picture>
                    </div>
                  ))}
              </div>
              {!user.name || user === {} ? (
                <div className='main-link login-btn'>
                  <LinkContainer to='/authentication/login'>
                    <Nav.Link>{t('header.login')}</Nav.Link>
                  </LinkContainer>
                </div>
              ) : (
                <Nav className='main-link login-btn'>
                  <Row className='user_row'>
                    <Col className='avatar_col'>
                      <div className='avatar_container'>
                        <img src={user.avatar} alt={user.name} />
                      </div>
                    </Col>
                    <Col md={6} className='name_col'>
                      {user.name}
                    </Col>
                    <div className='user_drop_links'>
                      <LinkContainer to='/' className='user_link'>
                        <Nav.Link>home</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/about' className='user_link'>
                        <Nav.Link>About</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/documentation' className='user_link'>
                        <Nav.Link>Documentation</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/apply_job' className='user_link'>
                        <Nav.Link>Apply Job</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/quote' className='user_link'>
                        <Nav.Link>Quote</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/career' className='user_link'>
                        <Nav.Link>Career</Nav.Link>
                      </LinkContainer>
                      <LinkContainer
                        to='/'
                        className='user_link'
                        onClick={logout}
                      >
                        <Nav.Link>logout</Nav.Link>
                      </LinkContainer>
                    </div>
                  </Row>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
