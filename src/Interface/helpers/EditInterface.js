import { faCirclePlus, faEdit } from '@fortawesome/free-solid-svg-icons';
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
import { useUpdateInterfaceMutation } from '../../store/apis/Interface/Interface';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import uploadFile from '../../functions/UploadFile';
import UploadFile from '../../functions/UploadFile';
import { ControlBar, Player } from 'video-react';
import logo from '../../images/logo.png';
import { useEffect } from 'react';

const EditInterfaceForm = ({ interfaceData, refetchInterface }) => {
  const { t } = useTranslation();
  const [updateInterface, { isLoading }] = useUpdateInterfaceMutation();

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

  const updateInterfaceData = async (e) => {
    try {
      e.preventDefault();
      const data = {
        head_text: {
          first_text: firstText,
          middle_text: middleText,
          last_text: lastText,
        },
        head_text_ar: {
          first_text_ar: firstTextAr,
          middle_text_ar: middleTextAr,
          last_text_ar: lastTextAr,
        },

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
        footer: {
          logo_text_white: logoTextWhite,
          logo_text_colored: logoTextColored,
          vertical_logo: verticalLogo,
          horizontal_logo: horizontalLogo,
          logo_img: logoImg,
          map_text: {
            colored_text: coloredText,
            colored_text_ar: coloredTextAr,
            custom_text: customText,
            custom_text_ar: customTextAr,
          },
          text,
          text_ar: textAr,
          brief,
          brief_ar: briefAr,
          btn_one: btnOne,
          btn_one_ar: btnOneAr,
          btn_two: btnTwo,
          btn_two_ar: btnTwoAr,
        },
      };

      await updateInterface({ interface_id: interfaceData._id, ...data }).then(
        (response) => {
          if (response.data) {
            toast.success(t('create_success'), {
              position: 'top-center',
            });

            handleClose();
            return refetchInterface();
          } else {
            return toast.error(response.error.data.message, {
              position: 'top-center',
            });
          }
        }
      );
    } catch (error) {
      return toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  useEffect(() => {
    // Head Text
    setFirstText(interfaceData.head_text.first_text);
    setFirstTextAr(interfaceData.head_text_ar.first_text_ar);
    setMiddleText(interfaceData.head_text.middle_text);
    setMiddleTextAr(interfaceData.head_text_ar.middle_text_ar);
    setLastText(interfaceData.head_text.last_text);
    setLastTextAr(interfaceData.head_text_ar.last_text_ar);

    // About

    setAboutName(interfaceData.about.name);
    setAboutNameAr(interfaceData.about.name_ar);
    setAboutTitle(interfaceData.about.title);
    setAboutTitleAr(interfaceData.about.title_ar);
    setAboutDescriptionOneMarked(
      interfaceData.about.description_one.marked_text
    );
    setAboutDescriptionOneMarkedAr(
      interfaceData.about.description_one_ar.marked_text_ar
    );
    setAboutDescriptionOneNormal(
      interfaceData.about.description_one.normal_text
    );
    setAboutDescriptionOneNormalAr(
      interfaceData.about.description_one_ar.normal_text_ar
    );
    setAboutDescriptionTwoMarked(
      interfaceData.about.description_two.marked_text
    );
    setAboutDescriptionTwoMarkedAr(
      interfaceData.about.description_two_ar.marked_text_ar
    );
    setAboutDescriptionTwoNormal(
      interfaceData.about.description_two.normal_text
    );
    setAboutDescriptionTwoNormalAr(
      interfaceData.about.description_two_ar.normal_text_ar
    );

    // Proof

    setProofsName(interfaceData.proofs.name);
    setProofsNameAr(interfaceData.proofs.name_ar);
    setProofsTitleFirstText(interfaceData.proofs.title.first_text);
    setProofsTitleFirstTextAr(interfaceData.proofs.title_ar.first_text_ar);
    setProofsTitleLastText(interfaceData.proofs.title.last_text);
    setProofsTitleLastTextAr(interfaceData.proofs.title_ar.last_text_ar);
    setProofsDescription(interfaceData.proofs.description);
    setProofsDescriptionAr(interfaceData.proofs.description_ar);

    // Partner

    setPartnerName(interfaceData.partner.name);
    setPartnerNameAr(interfaceData.partner.name_ar);
    setPartnerTitleFirstText(interfaceData.partner.title.first_text);
    setPartnerTitleFirstTextAr(interfaceData.partner.title_ar.first_text_ar);
    setPartnerTitleLastText(interfaceData.partner.title.last_text);
    setPartnerTitleLastTextAr(interfaceData.partner.title_ar.last_text_ar);
    setPartnerDescription(interfaceData.partner.description);
    setPartnerDescriptionAr(interfaceData.partner.description_ar);
    setPartnerImage(interfaceData.partner.image);

    // Footer

    setLogoTextWhite(interfaceData.footer.logo_text_white);
    setLogoTextColored(interfaceData.footer.logo_text_colored);
    setVerticalLogo(interfaceData.footer.vertical_logo);
    setHorizontalLogo(interfaceData.footer.horizontal_logo);
    setLogoImg(interfaceData.footer.logo_img);
    setColoredText(interfaceData.footer.map_text.colored_text);
    setColoredTextAr(interfaceData.footer.map_text.colored_text_ar);
    setCustomText(interfaceData.footer.map_text.custom_text);
    setCustomTextAr(interfaceData.footer.map_text.custom_text_ar);
    setText(interfaceData.footer.text);
    setTextAr(interfaceData.footer.text_ar);
    setBrief(interfaceData.footer.brief);
    setBriefAr(interfaceData.footer.brief_ar);
    setBtnOne(interfaceData.footer.btn_one);
    setBtnOneAr(interfaceData.footer.btn_one_ar);
    setBtnTwo(interfaceData.footer.btn_two);
    setBtnTwoAr(interfaceData.footer.btn_two_ar);

    // Solutions
    setSolutionsTitleFirstText(interfaceData.solutions.title_text.first_text);
    setSolutionsTitleFirstTextAr(
      interfaceData.solutions.title_text_ar.first_text_ar
    );
    setSolutionsTitleSecondText(interfaceData.solutions.title_text.second_text);
    setSolutionsTitleSecondTextAr(
      interfaceData.solutions.title_text_ar.second_text_ar
    );
    setSolutionsTitleThirdText(interfaceData.solutions.title_text.third_text);
    setSolutionsTitleThirdTextAr(
      interfaceData.solutions.title_text_ar.third_text_ar
    );
    setSolutionsTitleLastText(interfaceData.solutions.title_text.last_text);
    setSolutionsTitleLastTextAr(
      interfaceData.solutions.title_text_ar.last_text_ar
    );

    setSolutionsSubTitleFirstText(
      interfaceData.solutions.sub_title_text.first_text
    );
    setSolutionsSubTitleFirstTextAr(
      interfaceData.solutions.sub_title_text_ar.first_text_ar
    );
    setSolutionsSubTitleLastText(
      interfaceData.solutions.sub_title_text.last_text
    );
    setSolutionsSubTitleLastTextAr(
      interfaceData.solutions.sub_title_text_ar.last_text_ar
    );

    // Solutions Footer

    setFooterFirstText(interfaceData.solutions.footer_text.first_text);
    setFooterFirstTextAr(interfaceData.solutions.footer_text_ar.first_text_ar);
    setFooterSecondText(interfaceData.solutions.footer_text.second_text);
    setFooterSecondTextAr(
      interfaceData.solutions.footer_text_ar.second_text_ar
    );
    setFooterThirdText(interfaceData.solutions.footer_text.third_text);
    setFooterThirdTextAr(interfaceData.solutions.footer_text_ar.third_text_ar);
    setFooterLastText(interfaceData.solutions.footer_text.last_text);
    setFooterLastTextAr(interfaceData.solutions.footer_text_ar.last_text_ar);
    setImage(interfaceData.solutions.image);
    setVideo(interfaceData.solutions.video);
  }, [
    interfaceData.about.description_one.marked_text,
    interfaceData.about.description_one.normal_text,
    interfaceData.about.description_one_ar.marked_text_ar,
    interfaceData.about.description_one_ar.normal_text_ar,
    interfaceData.about.description_two.marked_text,
    interfaceData.about.description_two.normal_text,
    interfaceData.about.description_two_ar.marked_text_ar,
    interfaceData.about.description_two_ar.normal_text_ar,
    interfaceData.about.name,
    interfaceData.about.name_ar,
    interfaceData.about.title,
    interfaceData.about.title_ar,
    interfaceData.footer.brief,
    interfaceData.footer.brief_ar,
    interfaceData.footer.btn_one,
    interfaceData.footer.btn_one_ar,
    interfaceData.footer.btn_two,
    interfaceData.footer.btn_two_ar,
    interfaceData.footer.colored_text,
    interfaceData.footer.colored_text_ar,
    interfaceData.footer.custom_text,
    interfaceData.footer.custom_text_ar,
    interfaceData.footer.horizontal_logo,
    interfaceData.footer.logo_img,
    interfaceData.footer.logo_text_colored,
    interfaceData.footer.logo_text_white,
    interfaceData.footer.text,
    interfaceData.footer.text_ar,
    interfaceData.footer.vertical_logo,
    interfaceData.head_text.first_text,
    interfaceData.head_text.first_text_ar,
    interfaceData.head_text.last_text,
    interfaceData.head_text.last_text_ar,
    interfaceData.head_text.middle_text,
    interfaceData.head_text.middle_text_ar,
    interfaceData.head_text_ar.first_text_ar,
    interfaceData.head_text_ar.last_text_ar,
    interfaceData.head_text_ar.middle_text_ar,
    interfaceData.partner.description,
    interfaceData.partner.description_ar,
    interfaceData.partner.image,
    interfaceData.partner.name,
    interfaceData.partner.name_ar,
    interfaceData.partner.title.first_text,
    interfaceData.partner.title.last_text,
    interfaceData.partner.title_ar.first_text_ar,
    interfaceData.partner.title_ar.last_text_ar,
    interfaceData.proofs.description,
    interfaceData.proofs.description_ar,
    interfaceData.proofs.name,
    interfaceData.proofs.name_ar,
    interfaceData.proofs.title.first_text,
    interfaceData.proofs.title.last_text,
    interfaceData.proofs.title_ar.first_text_ar,
    interfaceData.proofs.title_ar.last_text_ar,
    interfaceData.solutions.footer_text.first_text,
    interfaceData.solutions.footer_text.last_text,
    interfaceData.solutions.footer_text.second_text,
    interfaceData.solutions.footer_text.third_text,
    interfaceData.solutions.footer_text_ar.first_text_ar,
    interfaceData.solutions.footer_text_ar.last_text_ar,
    interfaceData.solutions.footer_text_ar.second_text_ar,
    interfaceData.solutions.footer_text_ar.third_text_ar,
    interfaceData.solutions.image,
    interfaceData.solutions.sub_title_text.first_text,
    interfaceData.solutions.sub_title_text.last_text,
    interfaceData.solutions.sub_title_text.second_text,
    interfaceData.solutions.sub_title_text.third_text,
    interfaceData.solutions.sub_title_text_ar.first_text_ar,
    interfaceData.solutions.sub_title_text_ar.last_text_ar,
    interfaceData.solutions.sub_title_text_ar.second_text_ar,
    interfaceData.solutions.sub_title_text_ar.third_text_ar,
    interfaceData.solutions.title_text.first_text,
    interfaceData.solutions.title_text.last_text,
    interfaceData.solutions.title_text.second_text,
    interfaceData.solutions.title_text.third_text,
    interfaceData.solutions.title_text_ar.first_text_ar,
    interfaceData.solutions.title_text_ar.last_text_ar,
    interfaceData.solutions.title_text_ar.second_text_ar,
    interfaceData.solutions.title_text_ar.third_text_ar,
    interfaceData.solutions.video,
  ]);

  if (isLoading) return <CustomSpinner />;

  return (
    <>
      <div
        md={6}
        className='create_btn'
        onClick={handleShow}
        title={t('hpt_page.card.title', {
          en: 'Edit Interface',
          ar: 'تعديل الواجهه',
        })}
      >
        <FontAwesomeIcon icon={faEdit} size='3x' />
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
              en: 'Edit Interface',
              ar: 'تعديل الواجهه',
            })}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => updateInterfaceData(e)}>
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
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile('editWhiteLogo', null, setLogoTextWhite)
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
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile('editColoredLogo', null, setLogoTextColored)
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
                    id='editVerticalLogo'
                    disabled={isLoading}
                    onChange={() =>
                      uploadFile('editVerticalLogo', null, setVerticalLogo)
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
                id='editLogo'
                disabled={isLoading}
                onChange={() => uploadFile('editLogo', null, setLogoImg)}
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
            </Row>{' '}
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
            <hr />
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
                type='file'
                id='editPartnerImage'
                disabled={isLoading}
                onChange={(e) =>
                  UploadFile('editPartnerImage', null, setPartnerImage)
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
                      UploadFile('editSolutionsImage', null, setImage);
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
                      UploadFile('editSolutionsVideo', null, setVideo);
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
              {t('save_btn')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditInterfaceForm;
