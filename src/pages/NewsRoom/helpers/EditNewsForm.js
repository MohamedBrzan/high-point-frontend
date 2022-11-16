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
import { useUpdateNewsRoomMutation } from '../../../store/apis/NewsRoom/NewsRoom';
import { createNews } from '../../../store/reducers/NewsRoom/NewsRoomSlice';
import CustomSpinner from '../../../utils/CustomSpinner/CustomSpinner';

const EditNewsForm = ({ newsData, refetch }) => {
  const { t } = useTranslation();
  const [updateNews, { isLoading }] = useUpdateNewsRoomMutation();

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { news } = useSelector((state) => state.news);

  const [title, setTitle] = useState(news.title);
  const [titleAr, setTitleAr] = useState(news.title_ar);
  const [subDescription, setSubDescription] = useState(news.sub_description);
  const [subDescriptionAr, setSubDescriptionAr] = useState(
    news.sub_description_ar
  );
  const [descriptionAr, setDescriptionAr] = useState(news.description);
  const [description, setDescription] = useState(news.description_ar);
  const [images, setImages] = useState(news.images);

  const changeValue = (e) => e.target.value;

  function changeImages() {
    const files = document.getElementById('newsImages').files;

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
            setImages((newImage) => [...newImage, reader.result]);
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

  const editNews = async (e) => {
    try {
      const data = {
        title,
        title_ar: titleAr,
        images,
        sub_description: subDescription,
        sub_description_ar: subDescriptionAr,
        description: description,
        description_ar: descriptionAr,
      };
      e.preventDefault();
      await updateNews({ news_room_id: news._id, ...data }).then((response) => {
        if (response.data) {
          dispatch(createNews(response.data));
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
    setTitle(news.title);
    setTitleAr(news.title_ar);
    setSubDescription(news.sub_description);
    setSubDescriptionAr(news.sub_description_ar);
    setDescriptionAr(news.description);
    setDescription(news.description_ar);
    setImages(news.images);
  }, [
    news.description,
    news.description_ar,
    news.images,
    news.sub_description,
    news.sub_description_ar,
    news.title,
    news.title_ar,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_btn'
        onClick={() => {
          dispatch(createNews(newsData));
          handleShow();
        }}
        title={t('hpt_page.card.title', {
          en: `Edit ${news.title}`,
          ar: `تعديل ${news.title_ar}`,
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
            {t('hpt_page.card.title', {
              en: news.title,
              ar: news.title_ar,
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => editNews(e)}>
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
                {t('identifier_text_name.images')}
              </FormLabel>
              <FormControl
                disabled={isLoading}
                type='file'
                id='newsImages'
                onChange={changeImages}
                multiple
              />

              <Row>
                {images &&
                  images.length &&
                  images.map((img, index) => (
                    <Col key={index} className='news_room_image_group'>
                      <img src={img} alt='Images' className='w-100 mt-3' />
                      <CloseButton
                        onClick={() => {
                          const newImages = images.filter(
                            (images) => images !== img
                          );

                          setImages(newImages);
                        }}
                      >
                        X
                      </CloseButton>
                    </Col>
                  ))}
              </Row>
            </FormGroup>{' '}
            <Button disabled={isLoading} type='submit'>
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditNewsForm;
