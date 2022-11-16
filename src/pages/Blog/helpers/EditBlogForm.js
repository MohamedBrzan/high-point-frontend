import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateBlogMutation } from '../../../store/apis/Blog/Blog';
import { createBlog } from '../../../store/reducers/Blog/BlogSlice';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const EditBlogForm = ({ blogData, refetch }) => {
  const { t } = useTranslation();
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { blog } = useSelector((state) => state.blog);
  const [title, setTitle] = useState(blog.title);
  const [titleAr, setTitleAr] = useState(blog.title_ar);
  const [subDescription, setSubDescription] = useState(blog.sub_description);
  const [subDescriptionAr, setSubDescriptionAr] = useState(
    blog.sub_description_ar
  );
  const [descriptionAr, setDescriptionAr] = useState(blog.description);
  const [description, setDescription] = useState(blog.description_ar);
  const [cardImage, setCardImage] = useState(blog.card_image);
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

  const editBlog = async (e) => {
    try {
      const data = {
        title: title,
        title_ar: titleAr,
        card_image: cardImage,
        sub_description: subDescription,
        sub_description_ar: subDescriptionAr,
        description: description,
        description_ar: descriptionAr,
        head_images: headImages,
        footer_images: footerImages,
      };
      e.preventDefault();
      await updateBlog({ blog_id: blog._id, ...data }).then((response) => {
        if (response.data) {
          dispatch(createBlog(response.data));
          toast.success(t('update_success'), {
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

  useEffect(() => {
    setTitle(blog.title);
    setTitleAr(blog.title_ar);
    setSubDescription(blog.sub_description);
    setSubDescriptionAr(blog.sub_description_ar);
    setDescriptionAr(blog.description);
    setDescription(blog.description_ar);
    setCardImage(blog.card_image);
    setHeadImages(blog.head_images);
    setFooterImages(blog.footer_images);
  }, [
    blog.card_image,
    blog.description,
    blog.description_ar,
    blog.footer_images,
    blog.head_images,
    blog.sub_description,
    blog.sub_description_ar,
    blog.title,
    blog.title_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_btn'
        onClick={() => {
          dispatch(createBlog(blogData));
          handleShow();
        }}
        title={t('hpt_page.card.title', {
          en: `Edit ${blog.title}`,
          ar: `تعديل ${blog.title_ar}`,
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='1x' />
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
            {t('identifier_text_name.title', {
              en: blog.title,
              ar: blog.title_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editBlog(e)}>
            <Row>
              <Col md={6}>
                {' '}
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
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
                disabled={isLoading}
                type='file'
                id='blogHeadImages'
                onChange={changeHeadImages}
                multiple
              />

              <Row>
                {headImages &&
                  headImages.length &&
                  headImages.map((img, index) => (
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
            </FormGroup>{' '}
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.footer_images')}
              </FormLabel>
              <FormControl
                disabled={isLoading}
                type='file'
                id='blogFooterImages'
                onChange={changeFooterImages}
                multiple
              />

              <Row>
                {footerImages &&
                  footerImages.length &&
                  footerImages.map((img, index) => (
                    <Col key={index} className='blog_image_group'>
                      <img
                        src={img}
                        alt='Footer_Image'
                        className='w-100 mt-3'
                      />
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
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditBlogForm;
