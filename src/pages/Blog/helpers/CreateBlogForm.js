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
  CloseButton,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../../store/reducers/Blog/BlogSlice';
import { toast } from 'react-toastify';
import { useCreateBlogMutation } from '../../../store/apis/Blog/Blog';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const CreateBlogForm = ({ refetch }) => {
  const { t } = useTranslation();
  const [makeNewBlog, { isLoading }] = useCreateBlogMutation();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [subDescription, setSubDescription] = useState('');
  const [subDescriptionAr, setSubDescriptionAr] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [description, setDescription] = useState('');
  const [cardImage, setCardImage] = useState('');
  const [headImages, setHeadImages] = useState([]);
  const [footerImages, setFooterImages] = useState([]);

  const changeValue = (e) => e.target.value;

  const changeCardImage = () => {
    const file = document.getElementById('blogCardImage').files[0];
    const preview = document.getElementById('blogCardImagePreview');

    if (file.size > 5242880) {
      return toast.error(t('file_too_large'), {
        position: 'top-center',
      });
    }
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
        setCardImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function changeHeadImages() {
    const files = document.getElementById('blogHeadImages').files;

    for (let index in files) {
      if (files[index].size > 5242880) {
        return toast.error(t('file_too_large'), {
          position: 'top-center',
        });
      }
    }

    function readAndPreview(file) {
      // Make sure `file.name` matches our extensions criteria
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            const image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = reader.result;
            setHeadImages((newImage) => [...newImage, reader.result]);
          },
          false
        );

        reader.readAsDataURL(file);
      }
    }

    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
  }

  function changeFooterImages() {
    const files = document.getElementById('blogFooterImages').files;

    for (let index in files) {
      if (files[index].size > 5242880) {
        return toast.error(t('file_too_large'), {
          position: 'top-center',
        });
      }
    }

    function readAndPreview(file) {
      // Make sure `file.name` matches our extensions criteria
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            const image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = reader.result;
            setFooterImages((newImage) => [...newImage, reader.result]);
          },
          false
        );

        reader.readAsDataURL(file);
      }
    }

    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
  }

  const createNewBlog = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title,
        title_ar: titleAr,
        card_image: cardImage,
        sub_description: subDescription,
        sub_description_ar: subDescriptionAr,
        description: description,
        description_ar: descriptionAr,
        head_images: headImages,
        footer_images: footerImages,
      };

      await makeNewBlog({ ...data }).then((response) => {
        if (response.data) {
          dispatch(createBlog(response.data));
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setTitle('');
          setTitleAr('');
          setSubDescription('');
          setSubDescriptionAr('');
          setDescriptionAr('');
          setDescription('');
          setCardImage('');
          setHeadImages([]);
          setFooterImages([]);
          handleClose();
          return refetch();
        } else {
          return toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    } catch (error) {
      return toast.error(error.message, {
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
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Create New Blog',
          ar: 'أنشاء مدونة جديدة',
        })}
      >
        <FontAwesomeIcon icon={faCirclePlus} size='3x' />
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
            {t('hpt_page.card.title', {
              en: 'Create New Blog',
              ar: 'أنشاء مدونة جديدة',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewBlog(e)}>
            <Row>
              <Col md={6}>
                {' '}
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
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( AR )
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
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Sub {t('identifier_text_name.description')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={subDescription}
                    onChange={(e) => setSubDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    Sub {t('identifier_text_name.description')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={subDescriptionAr}
                    onChange={(e) => setSubDescriptionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={description}
                    onChange={(e) => setDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    as='textarea'
                    rows={5}
                    disabled={isLoading}
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.card_image')}
              </FormLabel>
              <FormControl
                required
                disabled={isLoading}
                type='file'
                id='blogCardImage'
                onChange={changeCardImage}
              />
              <img
                src={cardImage}
                id='blogCardImagePreview'
                alt='Card_Image'
                className='w-100 mt-3'
              />
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.head_images')}
              </FormLabel>
              <FormControl
                required
                disabled={isLoading}
                type='file'
                id='blogHeadImages'
                onChange={changeHeadImages}
                multiple
              />

              <Row>
                {headImages.map((img, index) => (
                  <Col key={index} className='blog_image_group'>
                    <img src={img} alt='Head_Image' className='w-100 mt-3' />
                    <CloseButton
                      onClick={() => {
                        const newImages = headImages.filter(
                          (images) => images !== img
                        );

                        setHeadImages(newImages);
                      }}
                    >
                      X
                    </CloseButton>
                  </Col>
                ))}
              </Row>
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.footer_images')}
              </FormLabel>
              <FormControl
                required
                disabled={isLoading}
                type='file'
                id='blogFooterImages'
                onChange={changeFooterImages}
                multiple
              />

              <Row>
                {footerImages.map((img, index) => (
                  <Col key={index} className='blog_image_group'>
                    <img src={img} alt='Footer_Image' className='w-100 mt-3' />
                    <CloseButton
                      onClick={() => {
                        const newImages = footerImages.filter(
                          (images) => images !== img
                        );

                        setFooterImages(newImages);
                      }}
                    >
                      X
                    </CloseButton>
                  </Col>
                ))}
              </Row>
            </FormGroup>
            <Button disabled={isLoading} type='submit'>
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateBlogForm;
