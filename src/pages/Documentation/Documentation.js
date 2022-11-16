import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import {
  useDeleteDocumentMutation,
  useGetAllDocumentationQuery,
  useGetDocumentationByIdQuery,
} from '../../store/apis/Documentation/Documentation';
import CustomSpinner from '../../utils/CustomSpinner/CustomSpinner';
import './Documentation.css';
import LinesAnimation from '../../anim/LinesAnimation/LinesAnimation';
import StyledButton from '../../common/StyledButton/StyledButton';
import CreateDocumentationForm from './helpers/CreateDocumentationForm';
import EditDocumentationForm from './helpers/EditDocumentationForm';
import CreateDocumentForm from './helpers/Document/CreateDocumentForm';
import EditDocumentForm from './helpers/Document/EditDocumentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import TextAnimation from '../../functions/TextAnimation';
import LetterAnimation from '../../functions/LetterAnimation';
import CleanAnimation from '../../functions/CleanAnimation';
import { useSelector } from 'react-redux';
// import NuclearAnimation from '../../anim/NuclearAnimation/NuclearAnimation';
import RemoveForMoreThanId from '../../functions/RemoveForMoreThanId';
import { Link } from 'react-router-dom';
import PageTitle from '../../utils/PageTitle';

const Documentation = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;

  const {
    data: allDocumentation,
    isLoading,
    refetch,
  } = useGetAllDocumentationQuery();

  const {
    data: documentation,
    isSuccess: documentIsSuccess,
    isLoading: documentationIsLoading,
    refetch: refetchDocumentation,
  } = useGetDocumentationByIdQuery(
    allDocumentation && allDocumentation[0] && allDocumentation[0]._id
      ? allDocumentation[0]._id
      : ''
  );
  const [deleteDocument, { isLoading: deleting }] = useDeleteDocumentMutation();

  const changeTitles = (e) => {
    const AllDocumentsTitles = document.querySelectorAll(
      '.documentation .document_title'
    );
    const AllDocumentsDescriptions = document.querySelectorAll(
      '.documentation .document_description'
    );

    AllDocumentsTitles.forEach((services_title) => {
      services_title.classList.remove('active');
      AllDocumentsDescriptions.forEach((documentation_document) => {
        documentation_document.classList.remove('active');
        if (
          documentation_document.getAttribute('data-card') ===
          e.target.getAttribute('data-title')
        ) {
          documentation_document.classList.add('active');
        }
      });
    });

    e.target.classList.add('active');
  };

  useEffect(() => {
    if (documentIsSuccess) {
      // const AllDocumentsTitles = document.querySelectorAll(
      //   '.documentation .main_row .document_title'
      // );
      const AllDocumentsTitles = Array.from(
        document.querySelectorAll('.documentation .main_row .document_title')
      );

      // const AllDocumentsDescriptions = document.querySelectorAll(
      //   '.documentation .main_row .document_description'
      // );

      const AllDocumentsDescriptions = Array.from(
        document.querySelectorAll(
          '.documentation .main_row .document_description'
        )
      );

      if (documentation) {
        AllDocumentsTitles[0].classList.add('active');
        AllDocumentsDescriptions[0].classList.add('active');
      }

      // if (AllDocumentsTitles && AllDocumentsDescriptions) {
      //   AllDocumentsTitles.forEach((title, index) => {
      //     if (index === 0) {
      //       title.classList.add('active');
      //     } else {
      //       title.classList.remove('active');
      //     }
      //   });
      //   AllDocumentsDescriptions.forEach((description, index) => {
      //     if (index === 0) {
      //       description.classList.add('active');
      //     } else {
      //       description.classList.remove('active');
      //     }
      //   });
      // }
      const footerText = document.querySelectorAll(
        '.documentation .documentation_footer .documentation_footer_text .footer_text_word span.footer_span_text'
      );

      window.onscroll = () => {
        if (footerText) {
          if (window.scrollY >= 1000) {
            LetterAnimation(footerText);
          } else {
            CleanAnimation(footerText);
          }
        }
      };
    }
  }, [documentIsSuccess, documentation]);

  if (isLoading || deleting || documentationIsLoading) return <CustomSpinner />;

  return (
    <section className='documentation'>
      {' '}
      <PageTitle>Documentation</PageTitle>
      <div className='section-head-image'></div>
      {/* <div className='nuclear_canvas_container'>{NuclearAnimation()}</div> */}
      {isAdmin ? (
        documentation && documentation._id ? (
          <>
            {' '}
            <EditDocumentationForm
              documentation={documentation}
              refetchDocumentation={refetchDocumentation}
            />
            <CreateDocumentForm
              documentation={documentation}
              refetchDocumentation={refetchDocumentation}
            />
          </>
        ) : (
          <CreateDocumentationForm refetch={refetch} />
        )
      ) : null}
      <div className='head_title'>
        {t('hpt_page.card.title', {
          en: documentation?.name,
          ar: documentation?.name_ar,
        })}
      </div>
      <Row className='main_row'>
        <Col xs={3}>
          {documentation &&
            documentation.document &&
            documentation.document.map(
              ({ _id, tab_title, tab_title_ar }, index) => (
                <div
                  key={index}
                  className='document_title'
                  data-title={_id}
                  onClick={(e) => changeTitles(e)}
                >
                  {t('hpt_page.card.title', {
                    en: tab_title,
                    ar: tab_title_ar,
                  })}
                </div>
              )
            )}
          <LinesAnimation />
        </Col>
        <Col xs={9}>
          {documentation &&
            documentation.document &&
            documentation.document.map(
              (
                {
                  _id,
                  tab_title,
                  tab_title_ar,
                  desc_title,
                  desc_title_ar,
                  description,
                  description_ar,
                },
                index
              ) => (
                <div
                  key={index}
                  className='document_description'
                  data-card={_id}
                >
                  {isAdmin ? (
                    <div className='actions'>
                      <EditDocumentForm
                        document={{
                          _id,
                          tab_title,
                          tab_title_ar,
                          desc_title,
                          desc_title_ar,
                          description,
                          description_ar,
                        }}
                        documentation_id={documentation._id}
                        refetchDocumentation={refetchDocumentation}
                      />
                      <div
                        className='delete_btn'
                        onClick={() => {
                          const data = {
                            documentation_id: documentation?._id,
                            document_id: _id,
                          };
                          RemoveForMoreThanId(
                            'document',
                            deleteDocument,
                            data,
                            refetchDocumentation
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} size='1x' />
                      </div>
                    </div>
                  ) : null}
                  <div className='title'>
                    {t('hpt_page.card.title', {
                      en: desc_title,
                      ar: desc_title_ar,
                    })}
                  </div>

                  <div className='description'>
                    {t('hpt_page.card.description', {
                      en: description,
                      ar: description_ar,
                    })}
                  </div>
                </div>
              )
            )}
        </Col>
      </Row>{' '}
      <section className='documentation_footer'>
        <picture>
          <img
            src={
              documentation &&
              documentation.footer_image &&
              documentation.footer_image
            }
            alt='documentation Footer Img.'
            className='w-100'
          />
        </picture>
        <Row className='documentation_footer_text'>
          <LinesAnimation />
          <Col md={8}>
            {documentation && (
              <div className='footer_text_word'>
                <div>
                  {TextAnimation(
                    'hpt_page.about_page.title',
                    'footer_span_text',
                    documentation.footer_text,
                    documentation.footer_text_ar,
                    null
                  )}
                </div>
                <div className='footer_btn'>
                  <Link
                    to='/about'
                    className='text-decoration-none'
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }
                  >
                    <StyledButton
                      margin='0'
                      color='white'
                      borderColor='white'
                      borderRightColor='white'
                    >
                      {t('hpt_page.about_page.title', {
                        en: 'ABOUT HTP',
                        ar: 'صفحة نبذه مختصره',
                      })}
                    </StyledButton>
                  </Link>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </section>
    </section>
  );
};

export default Documentation;
