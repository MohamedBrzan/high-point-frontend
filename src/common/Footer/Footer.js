import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import './Footer.css';
import {
  useDeleteLinkMutation,
  useGetAllInterfacesQuery,
  useGetInterfaceByIdQuery,
} from '../../store/apis/Interface/Interface';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateLinkForm from './helpers/CreateLink';
import EditLinkForm from './helpers/EditLink';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import RemoveForMoreThanId from '../../functions/RemoveForMoreThanId';
import { useGetAllProductsQuery } from '../../store/apis/Product/Product';
import TextAnimation from '../../functions/TextAnimation';

const Footer = () => {
  const { t } = useTranslation();
  const linkTitle = useRef();
  const socialTitle = useRef();
  const productTitle = useRef();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const { data: allInterfaces } = useGetAllInterfacesQuery();
  const { data: allProducts } = useGetAllProductsQuery();

  const { data: interfaceData, refetch } = useGetInterfaceByIdQuery(
    allInterfaces && allInterfaces[0] && allInterfaces[0]._id
      ? allInterfaces[0]._id
      : null
  );

  const [deleteLink] = useDeleteLinkMutation();

  useEffect(() => {
    const allPElements = document.querySelectorAll(
      'footer .links_col .link_col .general_link'
    );
    const allSocialLinksElements = document.querySelectorAll(
      'footer .links_col .social_link'
    );
    if (allProducts && allProducts.length > 0) {
      const allProductsLink = document.querySelectorAll(
        'footer .links_col .link_col .product_link'
      );

      allProductsLink.forEach((p) => {
        p.addEventListener('mouseenter', () => {
          productTitle.current.classList.add('active');
        });
        p.addEventListener('mouseleave', () => {
          productTitle.current.classList.remove('active');
        });
      });
    }

    allPElements.forEach((p) => {
      p.addEventListener('mouseenter', () => {
        linkTitle.current.classList.add('active');
      });
      p.addEventListener('mouseleave', () => {
        linkTitle.current.classList.remove('active');
      });
    });

    if (interfaceData?.social_links) {
      allSocialLinksElements.forEach((p) => {
        p.addEventListener('mouseenter', () => {
          socialTitle.current.classList.add('active');
        });
        p.addEventListener('mouseleave', () => {
          socialTitle.current.classList.remove('active');
        });
      });
    }
  }, [allProducts, interfaceData?.social_links]);

  return (
    <footer id='footer'>
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className='logo_col'>
            <div className='logo_text'>
              <picture>
                <img src={interfaceData?.footer?.logo_img} alt='Logo_Text.' />
              </picture>
            </div>
            <p>
              <small>
                {t('footer.brief', {
                  en: interfaceData?.footer?.brief,
                  ar: interfaceData?.footer?.brief_ar,
                })}
              </small>
            </p>
          </Col>
          <Col xs={12} md={8} className='links_col'>
            <Row>
              <Col xs={12} md={4} className='link_col'>
                <div className='title' ref={productTitle}>
                  products
                </div>
                {allProducts && allProducts.length > 0
                  ? allProducts.map(({ _id, title, title_ar }, index) => (
                      <div className='product_link' key={index}>
                        <Link
                          to={`/product/${index}`}
                          onClick={() =>
                            window.scrollTo({
                              top: 0,
                              behavior: 'smooth',
                            })
                          }
                        >
                          {TextAnimation(
                            'hpt_page.product_page.title',
                            'title_span_text',
                            title,
                            title_ar,
                            null
                          )}
                        </Link>
                      </div>
                    ))
                  : null}
              </Col>
              <Col xs={12} md={4} className='link_col'>
                <div className='title' ref={linkTitle}>
                  general
                </div>
                <div className='general_link'>
                  <Link to='/hpt-services'>Services</Link>
                </div>
                <div className='general_link'>
                  <Link to='/hpt-solutions'>Solutions</Link>
                </div>
                <div className='general_link'>
                  <Link to='/contact_us'>Contact Us</Link>
                </div>
              </Col>
              <Col xs={12} md={4} className='link_col'>
                {isAdmin ? (
                  <CreateLinkForm
                    interface_id={interfaceData?._id}
                    refetch={refetch}
                  />
                ) : null}
                <div className='title' ref={socialTitle}>
                  social
                </div>
                <div className='social_links'>
                  {interfaceData?.social_links &&
                    interfaceData?.social_links.map(
                      ({ _id, name, name_ar, url }, index) =>
                        name.match(/facebook/gi) && (
                          <div className='social_link' key={index}>
                            {isAdmin ? (
                              <div className='actions_btn'>
                                <EditLinkForm
                                  link={{ _id, name, name_ar, url }}
                                  interface_id={interfaceData?._id}
                                  refetch={refetch}
                                />
                                <div
                                  className='delete_btn'
                                  onClick={() => {
                                    const data = {
                                      interface_id: interfaceData?._id,
                                      link_id: _id,
                                    };
                                    RemoveForMoreThanId(
                                      'link',
                                      deleteLink,
                                      data,
                                      refetch
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} size='1x' />
                                </div>
                              </div>
                            ) : null}
                            <a
                              title={`Go to our ${name} account`}
                              href={url}
                              target='_blank'
                              rel='noreferrer'
                              key={index}
                            >
                              <FaFacebookF size={25} className='link' />
                              {name}
                            </a>
                          </div>
                        )
                    )}
                  {interfaceData?.social_links &&
                    interfaceData?.social_links.map(
                      ({ _id, name, name_ar, url }, index) =>
                        name.match(/linkedin/gi) && (
                          <div className='social_link' key={index}>
                            {isAdmin ? (
                              <div className='actions_btn'>
                                <EditLinkForm
                                  link={{ _id, name, name_ar, url }}
                                  interface_id={interfaceData?._id}
                                  refetch={refetch}
                                />
                                <div
                                  className='delete_btn'
                                  onClick={() => {
                                    const data = {
                                      interface_id: interfaceData?._id,
                                      link_id: _id,
                                    };
                                    RemoveForMoreThanId(
                                      'link',
                                      deleteLink,
                                      data,
                                      refetch
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} size='1x' />
                                </div>
                              </div>
                            ) : null}
                            <a
                              title={`Go to our ${name} account`}
                              href={url}
                              target='_blank'
                              rel='noreferrer'
                              key={index}
                            >
                              <FaLinkedinIn size={25} className='link' /> {name}
                            </a>
                          </div>
                        )
                    )}
                  {interfaceData?.social_links &&
                    interfaceData?.social_links.map(
                      ({ _id, name, name_ar, url }, index) =>
                        name.match(/twitter/gi) && (
                          <div className='social_link' key={index}>
                            {isAdmin ? (
                              <div className='actions_btn'>
                                <EditLinkForm
                                  link={{ _id, name, name_ar, url }}
                                  interface_id={interfaceData?._id}
                                  refetch={refetch}
                                />
                                <div
                                  className='delete_btn'
                                  onClick={() => {
                                    const data = {
                                      interface_id: interfaceData?._id,
                                      link_id: _id,
                                    };
                                    RemoveForMoreThanId(
                                      'link',
                                      deleteLink,
                                      data,
                                      refetch
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} size='1x' />
                                </div>
                              </div>
                            ) : null}
                            <a
                              title={`Go to our ${name} account`}
                              href={url}
                              target='_blank'
                              rel='noreferrer'
                              key={index}
                            >
                              <FaTwitter size={25} className='link' /> {name}
                            </a>
                          </div>
                        )
                    )}
                  {interfaceData?.social_links &&
                    interfaceData?.social_links.map(
                      ({ _id, name, name_ar, url }, index) =>
                        name.match(/youtube/gi) && (
                          <div className='social_link' key={index}>
                            {isAdmin ? (
                              <div className='actions_btn'>
                                <EditLinkForm
                                  link={{ _id, name, name_ar, url }}
                                  interface_id={interfaceData?._id}
                                  refetch={refetch}
                                />
                                <div
                                  className='delete_btn'
                                  onClick={() => {
                                    const data = {
                                      interface_id: interfaceData?._id,
                                      link_id: _id,
                                    };
                                    RemoveForMoreThanId(
                                      'link',
                                      deleteLink,
                                      data,
                                      refetch
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} size='1x' />
                                </div>
                              </div>
                            ) : null}
                            <a
                              title={`Go to our ${name} account`}
                              href={url}
                              target='_blank'
                              rel='noreferrer'
                            >
                              <FaYoutube size={25} className='link' /> {name}
                            </a>
                          </div>
                        )
                    )}
                  {interfaceData?.social_links &&
                    interfaceData?.social_links.map(
                      ({ _id, name, name_ar, url }, index) =>
                        name.match(/instagram/gi) && (
                          <div className='social_link' key={index}>
                            {isAdmin ? (
                              <div className='actions_btn'>
                                <EditLinkForm
                                  link={{ _id, name, name_ar, url }}
                                  interface_id={interfaceData?._id}
                                  refetch={refetch}
                                />
                                <div
                                  className='delete_btn'
                                  onClick={() => {
                                    const data = {
                                      interface_id: interfaceData?._id,
                                      link_id: _id,
                                    };
                                    RemoveForMoreThanId(
                                      'link',
                                      deleteLink,
                                      data,
                                      refetch
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} size='1x' />
                                </div>
                              </div>
                            ) : null}
                            <a
                              title={`Go to our ${name} account`}
                              href={url}
                              target='_blank'
                              rel='noreferrer'
                              key={index}
                            >
                              <FaInstagram size={25} className='link' /> {name}
                            </a>
                          </div>
                        )
                    )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='documentation_container'>
                  <Link to='/documentation'>Documentation</Link>
                </div>
              </Col>
              <Col>
                <div className='privacy_and_cookies_container'>
                  <Link to='/privacy&cookies'>Privacy & Cookies</Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
