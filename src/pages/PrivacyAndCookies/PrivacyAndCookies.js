import React, { useState } from 'react';
import { Col, Form, FormControl, FormGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import arrow from '../../images/title_arrow.svg';
import arrowAr from '../../images/title_arrow_ar.svg';
import './PrivacyAndCookies.css';

import { useSelector } from 'react-redux';
import {
  useGetAllPrivacyAndCookiesQuery,
  useGetPrivacyAndCookiesByIdQuery,
  useUpdatePrivacyAndCookiesMutation,
} from '../../store/apis/PrivacyAndCookies/PrivacyAndCookies';
import CreatePolicyForm from './helpers/CreatePolicyForm';
import EditPolicyForm from './helpers/EditPolicyForm';
import ReactMarkdown from 'react-markdown';
import PageTitle from '../../utils/PageTitle';

const PrivacyAndCookies = () => {
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;

  const {
    data: allPolicy,
    isLoading,
    refetch,
  } = useGetAllPrivacyAndCookiesQuery();

  const {
    data: policy,
    isSuccess: policyIsSuccess,
    refetch: refetchPolicy,
  } = useGetPrivacyAndCookiesByIdQuery(
    allPolicy && allPolicy[0] && allPolicy[0]._id ? allPolicy[0]._id : ''
  );

  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescripArtion] = useState('');

  const changeValue = (e) => e.target.value;

  const data = {
    title,
    title_ar: titleAr,
    description,
    description_ar: descriptionAr,
  };

  return (
    <section className='policy'>
      {' '}
      <PageTitle>Privacy And Cookies Policy</PageTitle>
      <div className='actions_btn'>
        {isAdmin ? (
          policy && policy._id ? (
            <EditPolicyForm policy={policy} refetchPolicy={refetchPolicy} />
          ) : (
            <CreatePolicyForm refetch={refetch} />
          )
        ) : null}
      </div>
      <div className='policy_top'>
        <span>
          <picture>
            <img src={arrowAr} alt='POLICY ARROW.' className='policy_arrow' />
          </picture>
        </span>
        <span className='top_text'>{t('header.home')}</span>
      </div>
      <hr />
      {policy && policy._id ? (
        <>
          <div className='policy_title'>
            <ReactMarkdown>
              {t('policy.title', {
                en: policy.title,
                ar: policy.title_ar,
              })}
            </ReactMarkdown>
          </div>

          <div className='date'>
            {t('updated_date')} : {new Date(policy.createdAt).toDateString()}
          </div>
          <hr />
          <div className='policy_description'>
            <ReactMarkdown>
              {t('policy.title', {
                en: policy.description,
                ar: policy.description_ar,
              })}
            </ReactMarkdown>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default PrivacyAndCookies;
