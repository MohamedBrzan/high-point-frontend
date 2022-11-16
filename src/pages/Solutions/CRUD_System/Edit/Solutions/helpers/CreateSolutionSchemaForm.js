import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../Edit.css';
import Modal from 'react-bootstrap/Modal';
import CustomSpinner from '../../../../../../utils/CustomSpinner/CustomSpinner';
import { useCreateSolutionSchemaMutation } from '../../../../../../store/apis/HptSolutions/HptSolutions';

const CreateSolutionSchemaForm = ({ isLoading, handleClose, refetch }) => {
  const { t } = useTranslation();
  const [createNewSolutionSchema, { isLoading: creating }] =
    useCreateSolutionSchemaMutation();

  const changeValue = (e) => e.target.value;

  // Header Text (EN)
  const [firstTextEn, setFirstTextEn] = useState('');
  const [secondTextEn, setSecondTextEn] = useState('');
  const [thirdTextEn, setThirdTextEn] = useState('');
  const [fourthTextEn, setFourthTextEn] = useState('');
  const [fifthTextEn, setFifthTextEn] = useState('');
  const [sixthTextEn, setSixthTextEn] = useState('');
  const [seventhTextEn, setSeventhTextEn] = useState('');
  // Header Text (AR)
  const [firstTextAr, setFirstTextAr] = useState('');
  const [secondTextAr, setSecondTextAr] = useState('');
  const [thirdTextAr, setThirdTextAr] = useState('');
  const [fourthTextAr, setFourthTextAr] = useState('');
  const [fifthTextAr, setFifthTextAr] = useState('');
  const [sixthTextAr, setSixthTextAr] = useState('');
  const [seventhTextAr, setSeventhTextAr] = useState('');

  // Head Image
  const [headImage, setHeadImage] = useState('');

  // Footer Image
  const [footerImage, setFooterImage] = useState('');

  // Intro Text (EN)
  const [introTextEn, setIntroTextEn] = useState('');
  // Intro Text (AR)
  const [introTextAr, setIntroTextAr] = useState('');

  // First Title Text (EN)
  const [firstTitleTextEn, setFirstTitleTextEn] = useState('');
  // First Title Text (AR)
  const [firstTitleTextAr, setFirstTitleTextAr] = useState('');

  // Last Title Text (EN)
  const [lastTitleTextEn, setLastTitleTextEn] = useState('');
  // Last Title Text (AR)
  const [lastTitleTextAr, setLastTitleTextAr] = useState('');

  // Sub Title Text (EN)
  const [firstSubTitleTextEn, setFirstSubTitleTextEn] = useState('');

  const [lastSubTitleTextEn, setLastSubTitleTextEn] = useState('');

  // Sub Title Text (AR)
  const [firstSubTitleTextAr, setFirstSubTitleTextAr] = useState('');

  const [lastSubTitleTextAr, setLastSubTitleTextAr] = useState('');

  // First Footer Text (EN)
  const [firstFooterTextEn, setFirstFooterTextEn] = useState('');
  // First Footer Text (AR)
  const [firstFooterTextAr, setFirstFooterTextAr] = useState('');

  // Last Footer Text (EN)
  const [lastFooterTextEn, setLastFooterTextEn] = useState('');
  // Last Footer Text (AR)
  const [lastFooterTextAr, setLastFooterTextAr] = useState('');

  const uploadHeadImage = () => {
    const file = document.getElementById('Solution_head_image').files[0];
    const preview = document.getElementById('Solution_head_img');

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        preview.src = reader.result;
        setHeadImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadFooterImage = () => {
    const file = document.getElementById('Solution_footer_image').files[0];
    const preview = document.getElementById('Solution_footer_img');

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        preview.src = reader.result;
        setFooterImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const data = {
    first_sub_title_text: firstSubTitleTextEn,
    last_sub_title_text: lastSubTitleTextEn,

    first_sub_title_text_ar: firstSubTitleTextAr,
    last_sub_title_text_ar: lastSubTitleTextAr,

    first_title_text: firstTitleTextEn,
    last_title_text: lastTitleTextEn,

    first_title_text_ar: firstTitleTextAr,
    last_title_text_ar: lastTitleTextAr,

    first_text: firstTextEn,
    second_text: secondTextEn,
    third_text: thirdTextEn,
    fourth_text: fourthTextEn,
    fifth_text: fifthTextEn,
    sixth_text: sixthTextEn,
    seventh_text: seventhTextEn,

    first_text_ar: firstTextAr,
    second_text_ar: secondTextAr,
    third_text_ar: thirdTextAr,
    fourth_text_ar: fourthTextAr,
    fifth_text_ar: fifthTextAr,
    sixth_text_ar: sixthTextAr,
    seventh_text_ar: seventhTextAr,

    first_footer_text: firstFooterTextEn,
    last_footer_text: lastFooterTextEn,

    first_footer_text_ar: firstFooterTextAr,
    last_footer_text_ar: lastFooterTextAr,

    head_image: headImage,
    intro_text: introTextEn,
    intro_text_ar: introTextAr,
    footer_image: footerImage,
  };

  const createSolutionSchema = async (e) => {
    try {
      e.preventDefault();
      await createNewSolutionSchema({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });
          refetch();
          handleClose();
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
    <Form
      className='p-2 Solution_schema_form'
      onSubmit={(e) => createSolutionSchema(e)}
    >
      <Modal.Body>
        <Row>
          <Col md={6}>
            {' '}
            <FormGroup className='col_group'>
              <FormLabel className='head_label p-2'>
                {t('identifier_text_name.head_image')}
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormControl
                  disabled={creating}
                  id='Solution_head_image'
                  type='file'
                  onChange={uploadHeadImage}
                />
                <img
                  src={headImage}
                  id='Solution_head_img'
                  alt='Head_Image'
                  className='mt-3 w-100'
                />
              </div>{' '}
            </FormGroup>{' '}
            <FormGroup className='col_group'>
              <FormLabel className='head_label p-2'>
                {t('identifier_text_name.footer_image')}
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormControl
                  disabled={creating}
                  id='Solution_footer_image'
                  type='file'
                  onChange={uploadFooterImage}
                />
                <img
                  src={footerImage}
                  id='Solution_footer_img'
                  alt='footer_Image'
                  className='mt-3 w-100'
                />
              </div>
            </FormGroup>
            <FormGroup className='title_text_group'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.title_text')} ( EN )
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} (EN) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstTitleTextEn}
                  onChange={(e) => setFirstTitleTextEn(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='title_text_group'>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} (AR) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstTitleTextAr}
                  onChange={(e) => setFirstTitleTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='title_text_group'>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.last_text')} (EN) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={lastTitleTextEn}
                  onChange={(e) => setLastTitleTextEn(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='title_text_group'>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.last_text')} (AR) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={lastTitleTextAr}
                  onChange={(e) => setLastTitleTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>{' '}
            <FormGroup className='sub_title_text_group'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.sub_title_text')} ( EN )
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} (EN) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstSubTitleTextEn}
                  onChange={(e) => setFirstSubTitleTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} (AR) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstSubTitleTextAr}
                  onChange={(e) => setFirstSubTitleTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.last_text')} (EN) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={lastSubTitleTextEn}
                  onChange={(e) => setLastSubTitleTextEn(changeValue(e))}
                ></FormControl>
              </div>{' '}
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.last_text')} (AR) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={lastSubTitleTextAr}
                  onChange={(e) => setLastSubTitleTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className='col_group'>
              <FormLabel className='head_label p-2'>
                {t('identifier_text_name.header_text')} ( EN )
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstTextEn}
                  onChange={(e) => setFirstTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.second_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={secondTextEn}
                  onChange={(e) => setSecondTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.third_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={thirdTextEn}
                  onChange={(e) => setThirdTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.fourth_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={fourthTextEn}
                  onChange={(e) => setFourthTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.fifth_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={fifthTextEn}
                  onChange={(e) => setFifthTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.sixth_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={sixthTextEn}
                  onChange={(e) => setSixthTextEn(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.seventh_text')} ( EN ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={seventhTextEn}
                  onChange={(e) => setSeventhTextEn(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='col_group'>
              <FormLabel className='head_label p-2'>
                {t('identifier_text_name.header_text')} ( AR )
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstTextAr}
                  onChange={(e) => setFirstTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.second_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={secondTextAr}
                  onChange={(e) => setSecondTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.third_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={thirdTextAr}
                  onChange={(e) => setThirdTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.fourth_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={fourthTextAr}
                  onChange={(e) => setFourthTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.fifth_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={fifthTextAr}
                  onChange={(e) => setFifthTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.sixth_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={sixthTextAr}
                  onChange={(e) => setSixthTextAr(changeValue(e))}
                ></FormControl>
              </div>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.seventh_text')} ( AR ) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={seventhTextAr}
                  onChange={(e) => setSeventhTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>{' '}
            <FormGroup className='intro_text_group'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.intro_text')} ( EN )
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormLabel>{t('identifier_text_name.text')} ( EN ) :</FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={introTextEn}
                  onChange={(e) => setIntroTextEn(changeValue(e))}
                ></FormControl>
              </div>{' '}
              <div className='px-3 mb-3'>
                <FormLabel>{t('identifier_text_name.text')} (AR) :</FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={introTextAr}
                  onChange={(e) => setIntroTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>{' '}
            <FormGroup className='footer_text_group'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.footer_text')} ( EN )
              </FormLabel>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} (EN) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstFooterTextEn}
                  onChange={(e) => setFirstFooterTextEn(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='footer_text_group'>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.first_text')} (AR) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={firstFooterTextAr}
                  onChange={(e) => setFirstFooterTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='footer_text_group'>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.last_text')} (EN) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={lastFooterTextEn}
                  onChange={(e) => setLastFooterTextEn(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
            <FormGroup className='footer_text_group'>
              <div className='px-3 mb-3'>
                <FormLabel>
                  {t('identifier_text_name.last_text')} (AR) :
                </FormLabel>
                <FormControl
                  disabled={creating}
                  required
                  as={'textarea'}
                  rows={3}
                  value={lastFooterTextAr}
                  onChange={(e) => setLastFooterTextAr(changeValue(e))}
                ></FormControl>
              </div>
            </FormGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className='m-2 p-3 submit_btn'
          disabled={isLoading}
          type='submit'
        >
          {creating ? <CustomSpinner /> : t('create_btn')}
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default CreateSolutionSchemaForm;
