import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import arrow from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import eye from '../../images/product-eye.svg';
import './Product.css';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import LinesAnimation from '../../anim/LinesAnimation/LinesAnimation';
import {
  useDeleteItemMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from '../../store/apis/Product/Product';
import { Col } from 'react-bootstrap';
import TextAnimation from '../../functions/TextAnimation';
import logo from '../../images/logo.png';
import EditProductForm from './helpers/EditProductForm';
import StyledButton from '../../common/StyledButton/StyledButton';
import { ControlBar, Player } from 'video-react';
import CreateItemForm from './helpers/item/CreateItemForm';
import EditItemForm from './helpers/item/EditItemForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import LetterAnimation from '../../functions/LetterAnimation';
import CleanAnimation from '../../functions/CleanAnimation';
import '/node_modules/video-react/dist/video-react.css'; // import css
import { useSelector } from 'react-redux';
import RemoveForMoreThanId from '../../functions/RemoveForMoreThanId';
import PageTitle from '../../utils/PageTitle';

// Render a YouTube video player

const Product = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  const location = useLocation();
  const indexNumber = location.pathname.split('/');

  const { data: product, refetch: refetchProduct } = useGetProductByIdQuery(
    allProducts &&
      allProducts[indexNumber[2]] &&
      allProducts[indexNumber[2]]._id
      ? allProducts[indexNumber[2]]._id
      : ''
  );

  const [deleteItem, { isLoading: deleting }] = useDeleteItemMutation();

  useEffect(() => {
    if (product && product._id) {
      const titleText = document.querySelectorAll(
        '.product .product__title span.title_span_text'
      );

      if (titleText) {
        LetterAnimation(titleText);
      }

      const subTitleText = document.querySelectorAll(
        '.product .product__sub-title span.sub_title_span_text'
      );

      if (subTitleText) {
        LetterAnimation(subTitleText);
      }

      const descOneText = document.querySelectorAll(
        '.product .product__desc-one span.desc_one_span_text'
      );

      if (descOneText) {
        LetterAnimation(descOneText);
      }

      const descTwoText = document.querySelectorAll(
        '.product .product__desc-two span.desc_two_span_text'
      );

      if (descTwoText) {
        LetterAnimation(descTwoText);
      }
      window.onscroll = () => {
        const footerText = document.querySelectorAll(
          '.product .product_footer_text .footer_text_word span.footer_span_text'
        );

        if (footerText) {
          if (window.scrollY >= 3000) {
            LetterAnimation(footerText);
          } else {
            CleanAnimation(footerText);
          }
        }
      };
    }
  }, [product]);

  if (isLoading || deleting) return <CustomSpinner />;

  return (
    <section className='product'>
      <PageTitle>{`${product?.title}`}</PageTitle>
      <div className='section-head-image'></div>
      {isAdmin ? (
        product && product._id ? (
          <EditProductForm product={product} refetchProduct={refetchProduct} />
        ) : null
      ) : null}

      {product && product._id && (
        <div className='product__container'>
          <Row className='product__row'>
            <div className='product__title'>
              <div className='eye_icon'>
                <picture>
                  <img src={eye} alt='Eye.' className='w-100' />
                </picture>
              </div>
              <div>
                {TextAnimation(
                  'hpt_page.product_page.title',
                  'title_span_text',
                  product.title,
                  product.title_ar,
                  null
                )}
              </div>
            </div>
            <div className='product__sub-title'>
              {i18n.language === 'en' ? (
                <>
                  <span>
                    <img src={arrow} alt='Arrow' className='arrow' />
                  </span>
                  {TextAnimation(
                    'hpt_page.product_page.sub_title',
                    'sub_title_span_text',
                    product.sub_title,
                    product.sub_title_ar,
                    null
                  )}
                </>
              ) : (
                <>
                  <span>
                    <img src={arrowAr} alt='Arrow' className='arrow_ar' />
                  </span>
                  {TextAnimation(
                    'hpt_page.product_page.sub_title',
                    'sub_title_span_text',
                    product.sub_title,
                    product.sub_title_ar,
                    null
                  )}
                </>
              )}
            </div>
            <Col md={6} className='product__desc-one'>
              {TextAnimation(
                'hpt_page.product_page.desc_text',
                'desc_one_span_text',
                product.desc_text_one,
                product.desc_text_ar_one,
                null
              )}
            </Col>
            <Col md={6} className='product__desc-two'>
              {TextAnimation(
                'hpt_page.product_page.desc_text',
                'desc_two_span_text',
                product.desc_text_two,
                product.desc_text_ar_two,
                null
              )}
            </Col>
          </Row>
        </div>
      )}
      <section className='items_container'>
        {isAdmin ? (
          <CreateItemForm
            refetchProduct={refetchProduct}
            product_id={product?._id}
          />
        ) : null}
        {product && product.items && product.items.length > 0 && (
          <article className='article_vezah'>
            <div className='article_title'>
              <span>01</span>
              <span className='text'>
                {t('hpt_page.product_page.desc_text', {
                  en: 'VEZAH',
                  ar: 'فيزا',
                })}
              </span>
            </div>
            <Row>
              <Col md={3}>
                <LinesAnimation />
              </Col>
              <Col>
                <div className='article_sub_title'>
                  <span className='text'>
                    {t('hpt_page.product_page.header_text', {
                      en: product.header_text,
                      ar: product.header_text_ar,
                    })}
                  </span>
                </div>

                {product.items.map((item, index) => (
                  <Row key={index} className='item_info'>
                    {isAdmin ? (
                      <>
                        <EditItemForm
                          product_id={product?._id}
                          item={item}
                          refetchProduct={refetchProduct}
                        />
                        <div
                          className='delete_item_btn'
                          onClick={() => {
                            const data = {
                              product_id: product._id,
                              item_id: item._id,
                            };

                            RemoveForMoreThanId(
                              'item',
                              deleteItem,
                              data,
                              refetchProduct
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} size='2x' />
                        </div>
                      </>
                    ) : null}
                    <div className='gradient_bg'></div>
                    <Col xs={8} md={11}>
                      <div className='item_title'>
                        {t('hpt_page.product_page.item.title', {
                          en: item.item_title,
                          ar: item.item_title_ar,
                        })}
                      </div>
                      <div className='item_description'>
                        {t('hpt_page.product_page.item.description', {
                          en: item.item_desc,
                          ar: item.item_desc_ar,
                        })}
                      </div>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </article>
        )}
      </section>
      {product && product._id && (
        <article className='article_download'>
          {i18n.language === 'en' ? (
            <div className='article_title'>
              <div className='arrow_img'>
                <img src={arrow} alt='' />
              </div>
              <div className='text'>
                <StyledButton
                  color={'white'}
                  borderColor={'white'}
                  borderRightWidth={'.1em'}
                  borderRightColor={'white'}
                >
                  {t('hpt_page.product_page.download_btn', {
                    en: 'Download Prodcuts Documents',
                    ar: 'تحميل مستندات المنتجات',
                  })}
                </StyledButton>
              </div>
            </div>
          ) : (
            <div className='article_title'>
              <div className='arrow_img'>
                <img src={arrowAr} alt='' />
              </div>
              <div className='text'>
                <StyledButton
                  color={'white'}
                  borderColor={'white'}
                  borderLeftWidth={'.1em'}
                  borderLeftColor={'white'}
                  iconDir='rtl'
                >
                  {t('hpt_page.product_page.download_btn', {
                    en: 'Download Prodcuts Documents',
                    ar: 'تحميل مستندات المنتجات',
                  })}
                </StyledButton>
              </div>
            </div>
          )}
          {product && product.video && (
            <div className='video_container my-3'>
              <div className='video_modal'></div>
              <Player
                muted
                fluid
                autoPlay
                playsInline
                poster={logo}
                src={product.video}
              >
                <ControlBar autoHide disableDefaultControls />
              </Player>
            </div>
          )}
        </article>
      )}
      {product && (
        <article className='article_footer'>
          {product.footer_image && (
            <div className='product_image'>
              <picture>
                <img
                  src={product.footer_image}
                  alt='products Footer Img.'
                  className='w-100'
                />
              </picture>
            </div>
          )}
          {product.footer_video && (
            <div className='video_container footer_video'>
              <div className='video_modal'></div>
              <Player
                muted
                fluid
                autoPlay
                playsInline
                poster={logo}
                src={product.footer_video}
                height={'1em'}
              >
                <ControlBar autoHide disableDefaultControls />
              </Player>
            </div>
          )}
          <Row className='product_footer_text'>
            <LinesAnimation />
            <Col md={8}>
              {product && (
                <div className='footer_text_word'>
                  <div>
                    {TextAnimation(
                      'hpt_page.product_page.footer_text',
                      'footer_span_text',
                      product.footer_text,
                      product.footer_text_ar,
                      null
                    )}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </article>
      )}
    </section>
  );
};

export default Product;
