import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
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
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useUpdateItemMutation } from '../../../../store/apis/Product/Product';
import CustomSpinner from '../../../../utils/CustomSpinner/CustomSpinner';

const EditItemForm = ({ product_id, item, refetchProduct }) => {
  const { t } = useTranslation();

  const [updateItem, { isLoading }] = useUpdateItemMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');

  const changeValue = (e) => e.target.value;

  const updateItemData = async (e) => {
    try {
      const data = {
        item_title: title,
        item_title_ar: titleAr,
        item_desc: description,
        item_desc_ar: descriptionAr,
      };
      e.preventDefault();
      await updateItem({ product_id, item_id: item._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('update_success'), {
              position: 'top-center',
            });
            handleClose();
            refetchProduct();
          } else {
            toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        }
      );
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    setTitle(item.item_title);
    setTitleAr(item.item_title_ar);

    setDescription(item.item_desc);
    setDescriptionAr(item.item_desc_ar);
  }, [item.item_desc, item.item_desc_ar, item.item_title, item.item_title_ar]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='edit_item_btn'
        onClick={() => {
          handleShow();
        }}
        title={t('hpt_page.product_page.title', {
          en: `Edit a new Item`,
          ar: '?????????? ??????????',
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='2x' />
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
              en: `Edit a new Item`,
              ar: '?????????? ??????????',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => updateItemData(e)}>
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

            <Button disabled={isLoading} type='submit'>
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditItemForm;
