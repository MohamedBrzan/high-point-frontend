import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import CustomSpinner from '../../../../../../utils/CustomSpinner/CustomSpinner';
import '../../Solutions/Edit.css';
import {
  useGetSolutionsSolutionsByIdQuery,
  useUpdateSolutionSolutionMutation,
} from '../../../../../../store/apis/SolutionsSolutions/SolutionsSolutions';
import { useGetAllSolutionsCardQuery } from '../../../../../../store/apis/SolutionsCard/SolutionsCard';
import { createSolutionSolution } from '../../../../../../store/reducers/solutions/Solution';

const TabSolutionForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const { solutionSolution } = useSelector((state) => state.solutionSolution);

  const { refetch } = useGetAllSolutionsCardQuery();
  const { data: solution, isLoading } = useGetSolutionsSolutionsByIdQuery(
    solutionSolution._id && solutionSolution._id
  );

  const [updateSolution, { isLoading: Updating }] =
    useUpdateSolutionSolutionMutation();
  const dispatch = useDispatch();

  const changeValue = (e) => e.target.value;

  // Card Title

  const [title, setTitle] = useState(solutionSolution.title || '');

  const [titleAr, setTitleAr] = useState(solutionSolution.title_ar || '');

  // Card Description

  const [description, setDescription] = useState(
    solutionSolution.description || ''
  );

  const [descriptionAr, setDescriptionAr] = useState(
    solutionSolution.description_ar || ''
  );

  // Card Images

  const [image, setImage] = useState(solutionSolution.image || '');

  if (isLoading) return <CustomSpinner />;

  const changeSolutionImage = () => {
    const file = document.getElementById('solutionImage').files[0];
    const preview = document.getElementById('solutionImagePreview');

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
        setImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateSolutionData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title,
        title_ar: titleAr,
        image,
        description,
        description_ar: descriptionAr,
      };
      await updateSolution({ solution_id: solution._id, ...data }).then(
        (response) => {
          if (response.data) {
            dispatch(createSolutionSolution(response.data));
            toast.success(t('update_success'), {
              position: 'top-center',
            });
            refetch();
            handleClose();
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

  return (
    <section className='service_schema_form'>
      <Form onSubmit={(e) => updateSolutionData(e)}>
        <Modal.Body>
          <Row className='main_row'>
            <Col md={6}>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.title_text')}
                </FormLabel>
                <div className='p-2'>
                  <FormLabel>{t('identifier_text_name.text')} ( EN )</FormLabel>
                  <FormControl
                    required
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(changeValue(e))}
                  />
                </div>
                <div className='p-2'>
                  <FormLabel>{t('identifier_text_name.text')} ( AR )</FormLabel>
                  <FormControl
                    required
                    type='text'
                    value={titleAr}
                    onChange={(e) => setTitleAr(changeValue(e))}
                  />
                </div>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup className='mb-3'>
                <FormLabel className='head_label'>
                  {t('identifier_text_name.card_image')}
                </FormLabel>
                <FormControl
                  type='file'
                  id='solutionImage'
                  accept='image/gif, image/jpeg, image/png'
                  onChange={changeSolutionImage}
                />
                <img
                  src={image}
                  id='solutionImagePreview'
                  alt='Card_Image.'
                  className='w-100 mt-3'
                />
              </FormGroup>
            </Col>

            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.description')}
              </FormLabel>
              <div className='p-2'>
                <FormLabel>{t('identifier_text_name.text')} ( EN )</FormLabel>
                <FormControl
                  required
                  type='text'
                  as={'textarea'}
                  row={5}
                  value={description}
                  onChange={(e) => setDescription(changeValue(e))}
                />
              </div>
              <div className='p-2'>
                <FormLabel>{t('identifier_text_name.text')} ( AR )</FormLabel>
                <FormControl
                  required
                  type='text'
                  as={'textarea'}
                  row={5}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(changeValue(e))}
                />
              </div>
            </FormGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='m-2 p-3 submit_btn'
            disabled={isLoading}
            type='submit'
          >
            {Updating ? <CustomSpinner /> : t('save_btn')}
          </Button>
        </Modal.Footer>
      </Form>
    </section>
  );
};

export default TabSolutionForm;
