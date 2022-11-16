import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
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
import { ControlBar, Player } from 'video-react';
import logo from '../../../images/logo.png';
import { useCreateProductMutation } from '../../../store/apis/Product/Product';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';
import UploadFile from '../../../functions/UploadFile';

const CreateProductForm = ({ refetch }) => {
  const FooterImageBtn = useRef();
  const FooterImageInput = useRef();
  const FooterVideoBtn = useRef();
  const FooterVideoInput = useRef();
  const { t } = useTranslation();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [subTitleAr, setSubTitleAr] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [headerTextAr, setHeaderTextAr] = useState('');
  const [descOne, setDescOne] = useState('');
  const [descOneAr, setDescOneAr] = useState('');
  const [descTwo, setDescTwo] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [video, setVideo] = useState('');
  const [footerImage, setFooterImage] = useState('');
  const [footerVideo, setFooterVideo] = useState('');
  const [descTwoAr, setDescTwoAr] = useState('');
  const [footerText, setFooterText] = useState('');
  const [footerTextAr, setFooterTextAr] = useState('');

  const changeValue = (e) => e.target.value;

  const createProductData = async (e) => {
    try {
      const data = {
        title,
        title_ar: titleAr,
        sub_title: subTitle,
        sub_title_ar: subTitleAr,
        header_text: headerText,
        header_text_ar: headerTextAr,
        desc_text_one: descOne,
        desc_text_ar_one: descOneAr,
        desc_text_two: descTwo,
        desc_text_ar_two: descTwoAr,
        description,
        description_ar: descriptionAr,
        video,
        footer_image: footerImage,
        footer_video: footerVideo,
        footer_text: footerText,
        footer_text_ar: footerTextAr,
      };
      e.preventDefault();
      await createProduct({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
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
        onClick={() => handleShow()}
        title={t('hpt_page.product_page.title', {
          en: `Create Product`,
          ar: 'إنشاء منتج',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='2x' />
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
            {t('hpt_page.product_page.title', {
              en: `Create Product`,
              ar: 'إنشاء منتج',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createProductData(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={title}
                    onChange={(e) => setTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={subTitle}
                    onChange={(e) => setSubTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={subTitleAr}
                    onChange={(e) => setSubTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.header_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={headerText}
                    onChange={(e) => setHeaderText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.header_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={headerTextAr}
                    onChange={(e) => setHeaderTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_one')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={descOne}
                    onChange={(e) => setDescOne(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_one')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={descOneAr}
                    onChange={(e) => setDescOneAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_two')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={descTwo}
                    onChange={(e) => setDescTwo(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.desc_two')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={descTwoAr}
                    onChange={(e) => setDescTwoAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.video')}
                </FormLabel>
                <FormControl
                  type='file'
                  id='createProductVideo'
                  disabled={isLoading}
                  onChange={() =>
                    UploadFile('createProductVideo', null, setVideo)
                  }
                  accept='video/mp4,video/x-m4v,video/*'
                />{' '}
                <Player
                  className='mt-3'
                  muted
                  fluid
                  autoPlay
                  preload='auto'
                  playsInline
                  src={video}
                  poster={logo}
                >
                  <ControlBar autoHide disableDefaultControls />
                </Player>
              </FormGroup>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={description}
                    onChange={(e) => setDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.footer_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={footerText}
                    onChange={(e) => setFooterText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.footer_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows='5'
                    disabled={isLoading}
                    value={footerTextAr}
                    onChange={(e) => setFooterTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>{' '}
            <Row>
              <Row className='src_selector_container'>
                <Col
                  ref={FooterImageBtn}
                  className='src_selector'
                  onClick={(e) => {
                    FooterImageInput.current.classList.add('active');

                    FooterVideoInput.current.classList.remove('active');
                    FooterImageBtn.current.classList.add('active');
                    FooterVideoBtn.current.classList.remove('active');
                  }}
                >
                  {t('identifier_text_name.image')}
                </Col>
                <Col
                  onClick={(e) => {
                    FooterImageInput.current.classList.remove('active');

                    FooterVideoInput.current.classList.add('active');
                    FooterImageBtn.current.classList.remove('active');
                    FooterVideoBtn.current.classList.add('active');
                  }}
                  ref={FooterVideoBtn}
                  className='src_selector'
                >
                  {t('identifier_text_name.video')}
                </Col>
              </Row>
              <FormGroup
                className='mb-3 src_selector_form_group'
                ref={FooterImageInput}
              >
                <FormLabel className='head_label'>
                  {t('identifier_text_name.image')}
                </FormLabel>
                <FormControl
                  type='file'
                  id='createProductFooterImage'
                  disabled={isLoading}
                  onChange={() =>
                    UploadFile(
                      'createProductFooterImage',
                      'createProductFooterImagePreview',
                      setFooterImage
                    )
                  }
                />
                <img
                  src={footerImage}
                  id='createProductFooterImagePreview'
                  alt=''
                  className='w-100 mt-3'
                />
              </FormGroup>
              <FormGroup
                className='mb-3 src_selector_form_group'
                ref={FooterVideoInput}
              >
                <FormLabel className='head_label'>
                  {t('identifier_text_name.video')}
                </FormLabel>
                <FormControl
                  type='file'
                  id='createProductFooterVideo'
                  disabled={isLoading}
                  onChange={() =>
                    UploadFile('createProductFooterVideo', null, setFooterVideo)
                  }
                  accept='video/mp4,video/x-m4v,video/*'
                />
                <Player
                  className='mt-3'
                  muted
                  fluid
                  autoPlay
                  preload='auto'
                  playsInline
                  src={footerVideo}
                  poster={logo}
                >
                  <ControlBar autoHide disableDefaultControls />
                </Player>
              </FormGroup>
            </Row>
            <Button disabled={isLoading} type='submit'>
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateProductForm;
