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
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useCreateInterfaceMutation } from '../../store/apis/Interface/Interface';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import uploadFile from '../../functions/UploadFile';
import UploadFile from '../../functions/UploadFile';
import { ControlBar, Player } from 'video-react';
import logo from '../../images/logo.png';

const CreateInterfaceForm = ({ refetch }) => {
  const { t } = useTranslation();
  const [makeNewInterface, { isLoading }] = useCreateInterfaceMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstText, setFirstText] = useState('');
  const [firstTextAr, setFirstTextAr] = useState('');
  const [middleText, setMiddleText] = useState('');
  const [middleTextAr, setMiddleTextAr] = useState('');
  const [lastText, setLastText] = useState('');
  const [lastTextAr, setLastTextAr] = useState('');
  const [logoTextWhite, setLogoTextWhite] = useState('');
  const [logoTextColored, setLogoTextColored] = useState('');
  const [verticalLogo, setVerticalLogo] = useState('');
  const [horizontalLogo, setHorizontalLogo] = useState('');
  const [logoImg, setLogoImg] = useState('');
  const [coloredText, setColoredText] = useState('');
  const [coloredTextAr, setColoredTextAr] = useState('');
  const [customText, setCustomText] = useState('');
  const [customTextAr, setCustomTextAr] = useState('');
  const [text, setText] = useState('');
  const [textAr, setTextAr] = useState('');
  const [brief, setBrief] = useState('');
  const [briefAr, setBriefAr] = useState('');
  const [btnOne, setBtnOne] = useState('');
  const [btnOneAr, setBtnOneAr] = useState('');
  const [btnTwo, setBtnTwo] = useState('');
  const [btnTwoAr, setBtnTwoAr] = useState('');
  const [aboutName, setAboutName] = useState('');
  const [aboutNameAr, setAboutNameAr] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutTitleAr, setAboutTitleAr] = useState('');
  const [aboutDescriptionOneMarked, setAboutDescriptionOneMarked] =
    useState('');
  const [aboutDescriptionOneMarkedAr, setAboutDescriptionOneMarkedAr] =
    useState('');
  const [aboutDescriptionOneNormal, setAboutDescriptionOneNormal] =
    useState('');
  const [aboutDescriptionOneNormalAr, setAboutDescriptionOneNormalAr] =
    useState('');
  const [aboutDescriptionTwoMarked, setAboutDescriptionTwoMarked] =
    useState('');
  const [aboutDescriptionTwoMarkedAr, setAboutDescriptionTwoMarkedAr] =
    useState('');
  const [aboutDescriptionTwoNormal, setAboutDescriptionTwoNormal] =
    useState('');
  const [aboutDescriptionTwoNormalAr, setAboutDescriptionTwoNormalAr] =
    useState('');
  const [proofsName, setProofsName] = useState('');
  const [proofsNameAr, setProofsNameAr] = useState('');
  const [proofsTitleFirstText, setProofsTitleFirstText] = useState('');
  const [proofsTitleFirstTextAr, setProofsTitleFirstTextAr] = useState('');
  const [proofsTitleLastText, setProofsTitleLastText] = useState('');
  const [proofsTitleLastTextAr, setProofsTitleLastTextAr] = useState('');
  const [proofsDescription, setProofsDescription] = useState('');
  const [proofsDescriptionAr, setProofsDescriptionAr] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerNameAr, setPartnerNameAr] = useState('');
  const [partnerTitleFirstText, setPartnerTitleFirstText] = useState('');
  const [partnerTitleFirstTextAr, setPartnerTitleFirstTextAr] = useState('');
  const [partnerTitleLastText, setPartnerTitleLastText] = useState('');
  const [partnerTitleLastTextAr, setPartnerTitleLastTextAr] = useState('');
  const [partnerDescription, setPartnerDescription] = useState('');
  const [partnerDescriptionAr, setPartnerDescriptionAr] = useState('');
  const [partnerImage, setPartnerImage] = useState('');
  const [solutionsTitleFirstText, setSolutionsTitleFirstText] = useState('');
  const [solutionsTitleFirstTextAr, setSolutionsTitleFirstTextAr] =
    useState('');
  const [solutionsTitleSecondText, setSolutionsTitleSecondText] = useState('');
  const [solutionsTitleSecondTextAr, setSolutionsTitleSecondTextAr] =
    useState('');
  const [solutionsTitleThirdText, setSolutionsTitleThirdText] = useState('');
  const [solutionsTitleThirdTextAr, setSolutionsTitleThirdTextAr] =
    useState('');
  const [solutionsTitleLastText, setSolutionsTitleLastText] = useState('');
  const [solutionsTitleLastTextAr, setSolutionsTitleLastTextAr] = useState('');
  const [solutionsSubTitleFirstText, setSolutionsSubTitleFirstText] =
    useState('');
  const [solutionsSubTitleFirstTextAr, setSolutionsSubTitleFirstTextAr] =
    useState('');

  const [solutionsSubTitleLastText, setSolutionsSubTitleLastText] =
    useState('');
  const [solutionsSubTitleLastTextAr, setSolutionsSubTitleLastTextAr] =
    useState('');
  const [footerFirstText, setFooterFirstText] = useState('');
  const [footerFirstTextAr, setFooterFirstTextAr] = useState('');
  const [footerSecondText, setFooterSecondText] = useState('');
  const [footerSecondTextAr, setFooterSecondTextAr] = useState('');
  const [footerThirdText, setFooterThirdText] = useState('');
  const [footerThirdTextAr, setFooterThirdTextAr] = useState('');
  const [footerLastText, setFooterLastText] = useState('');
  const [footerLastTextAr, setFooterLastTextAr] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');

  const changeValue = (e) => e.target.value;

  const createNewInterface = async (e) => {
    try {
      e.preventDefault();
      const data = {
        first_text: firstText,
        middle_text: middleText,
        last_text: lastText,
        first_text_ar: firstTextAr,
        middle_text_ar: middleTextAr,
        last_text_ar: lastTextAr,
        logo_text_white: logoTextWhite,
        logo_text_colored: logoTextColored,
        vertical_logo: verticalLogo,
        horizontal_logo: horizontalLogo,
        logo_img: logoImg,
        colored_text: coloredText,
        colored_text_ar: coloredTextAr,
        custom_text: customText,
        custom_text_ar: customTextAr,
        text,
        text_ar: textAr,
        brief,
        brief_ar: briefAr,
        btn_one: btnOne,
        btn_one_ar: btnOneAr,
        btn_two: btnTwo,
        btn_two_ar: btnTwoAr,

        about: {
          name: aboutName,
          name_ar: aboutNameAr,
          title: aboutTitle,
          title_ar: aboutTitleAr,
          description_one: {
            marked_text: aboutDescriptionOneMarked,
            normal_text: aboutDescriptionOneNormal,
          },
          description_one_ar: {
            marked_text_ar: aboutDescriptionOneMarkedAr,
            normal_text_ar: aboutDescriptionOneNormalAr,
          },
          description_two: {
            marked_text: aboutDescriptionTwoMarked,
            normal_text: aboutDescriptionTwoNormal,
          },
          description_two_ar: {
            marked_text_ar: aboutDescriptionTwoMarkedAr,
            normal_text_ar: aboutDescriptionTwoNormalAr,
          },
        },

        proofs: {
          name: proofsName,
          name_ar: proofsNameAr,
          title: {
            first_text: proofsTitleFirstText,
            last_text: proofsTitleLastText,
          },
          title_ar: {
            first_text_ar: proofsTitleFirstTextAr,
            last_text_ar: proofsTitleLastTextAr,
          },

          description: proofsDescription,
          description_ar: proofsDescriptionAr,
        },

        partner: {
          name: partnerName,
          name_ar: partnerNameAr,
          title: {
            first_text: partnerTitleFirstText,
            last_text: partnerTitleLastText,
          },
          title_ar: {
            first_text_ar: partnerTitleFirstTextAr,
            last_text_ar: partnerTitleLastTextAr,
          },

          description: partnerDescription,
          description_ar: partnerDescriptionAr,
          image: partnerImage,
        },

        solutions: {
          title_text: {
            first_text: solutionsTitleFirstText,
            second_text: solutionsTitleSecondText,
            third_text: solutionsTitleThirdText,
            last_text: solutionsTitleLastText,
          },
          title_text_ar: {
            first_text_ar: solutionsTitleFirstTextAr,
            second_text_ar: solutionsTitleSecondTextAr,
            third_text_ar: solutionsTitleThirdTextAr,
            last_text_ar: solutionsTitleLastTextAr,
          },
          sub_title_text: {
            first_text: solutionsSubTitleFirstText,
            last_text: solutionsSubTitleLastText,
          },
          sub_title_text_ar: {
            first_text_ar: solutionsSubTitleFirstTextAr,
            last_text_ar: solutionsSubTitleLastTextAr,
          },
          footer_text: {
            first_text: footerFirstText,
            second_text: footerSecondText,
            third_text: footerThirdText,
            last_text: footerLastText,
          },
          footer_text_ar: {
            first_text_ar: footerFirstTextAr,
            second_text_ar: footerSecondTextAr,
            third_text_ar: footerThirdTextAr,
            last_text_ar: footerLastTextAr,
          },
          image,
          video,
        },
      };

      await makeNewInterface({ ...data }).then((response) => {
        if (response.data) {
          toast.success(t('create_success'), {
            position: 'top-center',
          });

          setFirstText('');
          setFirstTextAr('');
          setMiddleText('');
          setMiddleTextAr('');
          setLastText('');
          setLastTextAr('');
          setLogoTextWhite('');
          setLogoTextColored('');
          setVerticalLogo('');
          setHorizontalLogo('');
          setLogoImg('');
          setColoredText('');
          setColoredTextAr('');
          setCustomText('');
          setCustomTextAr('');
          setLogoImg('');
          setText('');
          setTextAr('');
          setBrief('');
          setBriefAr('');
          setBtnOne('');
          setBtnOneAr('');
          setBtnTwo('');
          setBtnTwoAr('');
          setAboutName('');
          setAboutNameAr('');
          setAboutTitle('');
          setAboutTitleAr('');
          setAboutDescriptionOneMarked('');
          setAboutDescriptionOneMarkedAr('');
          setAboutDescriptionOneNormal('');
          setAboutDescriptionOneNormalAr('');
          setAboutDescriptionTwoMarked('');
          setAboutDescriptionTwoMarkedAr('');
          setAboutDescriptionTwoNormal('');
          setAboutDescriptionTwoNormalAr('');
          setProofsName('');
          setProofsNameAr('');
          setProofsTitleFirstText('');
          setProofsTitleFirstTextAr('');
          setProofsTitleLastText('');
          setProofsTitleLastTextAr('');
          setProofsDescription('');
          setProofsDescriptionAr('');
          setPartnerName('');
          setPartnerNameAr('');
          setPartnerTitleFirstText('');
          setPartnerTitleFirstTextAr('');
          setPartnerTitleLastText('');
          setPartnerTitleLastTextAr('');
          setPartnerDescription('');
          setPartnerDescriptionAr('');
          setPartnerImage('');
          setSolutionsTitleFirstText('');
          setSolutionsTitleFirstTextAr('');
          setSolutionsTitleSecondText('');
          setSolutionsTitleSecondTextAr('');
          setSolutionsTitleThirdText('');
          setSolutionsTitleThirdTextAr('');
          setSolutionsTitleLastText('');
          setSolutionsTitleLastTextAr('');
          setSolutionsSubTitleFirstText('');
          setSolutionsSubTitleFirstTextAr('');
          setSolutionsSubTitleLastText('');
          setSolutionsSubTitleLastTextAr('');
          setFooterFirstText('');
          setFooterFirstTextAr('');
          setFooterSecondText('');
          setFooterSecondTextAr('');
          setFooterThirdText('');
          setFooterThirdTextAr('');
          setFooterLastText('');
          setFooterLastTextAr('');
          setImage('');
          setVideo('');

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
          en: 'Create New Interface',
          ar: 'أنشاء الواجهه',
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
              en: 'Create New Interface',
              ar: 'أنشاء الواجهه',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => createNewInterface(e)}>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={firstText}
                    onChange={(e) => setFirstText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={firstTextAr}
                    onChange={(e) => setFirstTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.middle_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={middleText}
                    onChange={(e) => setMiddleText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.middle_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={middleTextAr}
                    onChange={(e) => setMiddleTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={lastText}
                    onChange={(e) => setLastText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={lastTextAr}
                    onChange={(e) => setLastTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className='section_title'>
              {t('identifier_text_name.images')}
            </div>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.logo_text_white')}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadWhiteLogo'
                    required
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile('uploadWhiteLogo', null, setLogoTextWhite)
                    }
                  />
                  <img src={logoTextWhite} alt='' className='w-100 my-3' />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.logo_text_colored')}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadColoredLogo'
                    required
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile('uploadColoredLogo', null, setLogoTextColored)
                    }
                  />
                  <img src={logoTextColored} alt='' className='w-100 my-3' />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.vertical_logo')}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadVerticalLogo'
                    required
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile('uploadVerticalLogo', null, setVerticalLogo)
                    }
                  />
                  <img src={verticalLogo} alt='' className='w-100 my-3' />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.horizontal_logo')}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadHorizontalLogo'
                    required
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile(
                        'uploadHorizontalLogo',
                        null,
                        setHorizontalLogo
                      )
                    }
                  />
                  <img src={horizontalLogo} alt='' className='w-100 my-3' />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('hpt_page.interface_page.footer.logo_img')}
              </FormLabel>
              <FormControl
                type='file'
                id='uploadLogo'
                required
                disabled={isLoading}
                onChange={() => uploadFile('uploadLogo', null, setLogoImg)}
              />
              <img src={logoImg} alt='' className='w-100 my-3' />
            </FormGroup>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={text}
                    onChange={(e) => setText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={textAr}
                    onChange={(e) => setTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.footer.map_text')}
            </div>
            <hr />{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.colored_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={coloredText}
                    onChange={(e) => setColoredText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.colored_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={coloredTextAr}
                    onChange={(e) => setColoredTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.custom_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={customText}
                    onChange={(e) => setCustomText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.custom_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={customTextAr}
                    onChange={(e) => setCustomTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className='section_title'>
              {t('hpt_page.interface_page.footer.brief')}
            </div>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.brief')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={brief}
                    onChange={(e) => setBrief(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.brief')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={briefAr}
                    onChange={(e) => setBriefAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.buttons')}
            </div>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.btn_one_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={btnOne}
                    onChange={(e) => setBtnOne(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.btn_one_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={btnOneAr}
                    onChange={(e) => setBtnOneAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.btn_two_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={btnTwo}
                    onChange={(e) => setBtnTwo(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('hpt_page.interface_page.footer.btn_two_text')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={btnTwoAr}
                    onChange={(e) => setBtnTwoAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.about.text')}
            </div>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={aboutName}
                    onChange={(e) => setAboutName(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={aboutNameAr}
                    onChange={(e) => setAboutNameAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.title')} ( Ar )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={aboutTitleAr}
                    onChange={(e) => setAboutTitleAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.marked_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionOneMarked}
                    onChange={(e) =>
                      setAboutDescriptionOneMarked(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.marked_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionOneMarkedAr}
                    onChange={(e) =>
                      setAboutDescriptionOneMarkedAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.text')} ( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionOneNormal}
                    onChange={(e) =>
                      setAboutDescriptionOneNormal(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.text')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionOneNormalAr}
                    onChange={(e) =>
                      setAboutDescriptionOneNormalAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.marked_text')} ( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionTwoMarked}
                    onChange={(e) =>
                      setAboutDescriptionTwoMarked(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.marked_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionTwoMarkedAr}
                    onChange={(e) =>
                      setAboutDescriptionTwoMarkedAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.text')} ( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionTwoNormal}
                    onChange={(e) =>
                      setAboutDescriptionTwoNormal(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}
                    {t('identifier_text_name.text')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={aboutDescriptionTwoNormalAr}
                    onChange={(e) =>
                      setAboutDescriptionTwoNormalAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.proof.text')}
            </div>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={proofsName}
                    onChange={(e) => setProofsName(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={proofsNameAr}
                    onChange={(e) => setProofsNameAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={proofsTitleFirstText}
                    onChange={(e) => setProofsTitleFirstText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={proofsTitleFirstTextAr}
                    onChange={(e) => setProofsTitleFirstTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={proofsTitleLastText}
                    onChange={(e) => setProofsTitleLastText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={proofsTitleLastTextAr}
                    onChange={(e) => setProofsTitleLastTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={proofsDescription}
                    onChange={(e) => setProofsDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={proofsDescriptionAr}
                    onChange={(e) => setProofsDescriptionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.partner.text')}
            </div>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={partnerName}
                    onChange={(e) => setPartnerName(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.name')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={partnerNameAr}
                    onChange={(e) => setPartnerNameAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={partnerTitleFirstText}
                    onChange={(e) => setPartnerTitleFirstText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={partnerTitleFirstTextAr}
                    onChange={(e) => setPartnerTitleFirstTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={partnerTitleLastText}
                    onChange={(e) => setPartnerTitleLastText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={partnerTitleLastTextAr}
                    onChange={(e) => setPartnerTitleLastTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')}( EN )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={partnerDescription}
                    onChange={(e) => setPartnerDescription(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.description')} ( AR )
                  </FormLabel>
                  <FormControl
                    as='textarea'
                    rows='5'
                    required
                    disabled={isLoading}
                    value={partnerDescriptionAr}
                    onChange={(e) => setPartnerDescriptionAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className='mb-3'>
              <FormLabel className='head_label'>
                {t('identifier_text_name.image')} ( AR )
              </FormLabel>
              <FormControl
                required
                type='file'
                id='uploadPartnerImage'
                disabled={isLoading}
                onChange={(e) =>
                  UploadFile('uploadPartnerImage', null, setPartnerImage)
                }
              />
              <img src={partnerImage} alt='' className='w-100 my-3' />
            </FormGroup>
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.solutions.text')}
            </div>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleFirstText}
                    onChange={(e) => setSolutionsTitleFirstText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleFirstTextAr}
                    onChange={(e) =>
                      setSolutionsTitleFirstTextAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.second_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleSecondText}
                    onChange={(e) =>
                      setSolutionsTitleSecondText(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.second_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleSecondTextAr}
                    onChange={(e) =>
                      setSolutionsTitleSecondTextAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.third_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleThirdText}
                    onChange={(e) => setSolutionsTitleThirdText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.third_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleThirdTextAr}
                    onChange={(e) =>
                      setSolutionsTitleThirdTextAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleLastText}
                    onChange={(e) => setSolutionsTitleLastText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsTitleLastTextAr}
                    onChange={(e) =>
                      setSolutionsTitleLastTextAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsSubTitleFirstText}
                    onChange={(e) =>
                      setSolutionsSubTitleFirstText(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsSubTitleFirstTextAr}
                    onChange={(e) =>
                      setSolutionsSubTitleFirstTextAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsSubTitleLastText}
                    onChange={(e) =>
                      setSolutionsSubTitleLastText(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.sub_title_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={solutionsSubTitleLastTextAr}
                    onChange={(e) =>
                      setSolutionsSubTitleLastTextAr(changeValue(e))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>{' '}
            <hr />
            <div className='section_title'>
              {t('hpt_page.interface_page.footer.text')}
            </div>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerFirstText}
                    onChange={(e) => setFooterFirstText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.first_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerFirstTextAr}
                    onChange={(e) => setFooterFirstTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.second_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerSecondText}
                    onChange={(e) => setFooterSecondText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.second_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerSecondTextAr}
                    onChange={(e) => setFooterSecondTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.third_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerThirdText}
                    onChange={(e) => setFooterThirdText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.third_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerThirdTextAr}
                    onChange={(e) => setFooterThirdTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')}( EN )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerLastText}
                    onChange={(e) => setFooterLastText(changeValue(e))}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.last_text')} ( AR )
                  </FormLabel>
                  <FormControl
                    required
                    disabled={isLoading}
                    value={footerLastTextAr}
                    onChange={(e) => setFooterLastTextAr(changeValue(e))}
                  />
                </FormGroup>
              </Col>
            </Row>{' '}
            <Row>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.image')}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadSolutionsImage'
                    disabled={isLoading}
                    onChange={(e) => {
                      UploadFile('uploadSolutionsImage', null, setImage);
                      setVideo('');
                    }}
                  />
                  <img src={image} alt='' className='w-100 my-3' />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='mb-3'>
                  <FormLabel className='head_label'>
                    {t('identifier_text_name.video')}
                  </FormLabel>
                  <FormControl
                    type='file'
                    id='uploadSolutionsVideo'
                    disabled={isLoading}
                    onChange={(e) => {
                      UploadFile('uploadSolutionsVideo', null, setVideo);
                      setImage('');
                    }}
                  />{' '}
                  <Player
                    muted
                    fluid
                    autoPlay
                    playsInline
                    poster={logo}
                    src={video}
                    height={'1em'}
                  >
                    <ControlBar autoHide disableDefaultControls />
                  </Player>
                </FormGroup>
              </Col>
            </Row>{' '}
            <Button disabled={isLoading} type='submit'>
              {t('create_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateInterfaceForm;
