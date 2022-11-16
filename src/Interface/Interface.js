import React from 'react';
import AppIntro from './sections/AppIntro/AppIntro';
import HptServices from './sections/HptServices/HptServices';
import About from './sections/About/About';
import WhyHighPoint from './sections/WhyHighPoint/WhyHighPoint';
import Partners from './sections/Partners/Partners';
import NewsRoomComponent from './sections/NewsRoomComponent/NewsRoomComponent';
import {
  useGetAllInterfacesQuery,
  useGetInterfaceByIdQuery,
} from '../store/apis/Interface/Interface';
import { useEffect } from 'react';
import Solutions from './sections/Solutions/Solutions';
import {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
} from '../store/apis/HptServices/HptServices';
import './Interface.css';
import CreateInterfaceForm from './helpers/CreateInterface';
import EditInterfaceForm from './helpers/EditInterface';
import LetterAnimation from '../functions/LetterAnimation';
import CleanAnimation from '../functions/CleanAnimation';
import { useSelector } from 'react-redux';
import CustomSpinner from '../utils/CustomSpinner/CustomSpinner';
import PageTitle from '../utils/PageTitle';

const Interface = () => {
  const {
    data: allInterfaces,
    refetch,
    isFetching,
  } = useGetAllInterfacesQuery();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const {
    data: interfaceData,
    isFetching: interfaceIsSuccess,
    refetch: refetchInterface,
  } = useGetInterfaceByIdQuery(
    allInterfaces && allInterfaces[0] && allInterfaces[0]._id
      ? allInterfaces[0]._id
      : ''
  );

  const {
    data: allServices,
    isFetching: servicesIsSuccess,
    isLoading,
  } = useGetAllServicesQuery();
  const {
    data: service,
    isFetching: serviceIsSuccess,
    isLoading: serviceIsLoading,
  } = useGetServiceByIdQuery(
    allServices && allServices[0] && allServices[0]._id
      ? allServices[0]._id
      : ''
  );

  useEffect(() => {
    if (
      isFetching ||
      interfaceIsSuccess ||
      servicesIsSuccess ||
      serviceIsSuccess
    ) {
      const runSpinner = setInterval(() => <CustomSpinner />, 10);
      setTimeout(() => clearInterval(runSpinner), 10000);
    }

    window.onscroll = () => {
      if (
        interfaceData &&
        interfaceData.solutions &&
        interfaceData.solutions.solution
      ) {
        const allSolutionsImages = document.querySelectorAll(
          '.interface .solutions .img-col'
        );

        allSolutionsImages.forEach((solutionImg) => {
          allSolutionsImages.forEach((solution) =>
            solution.classList.remove('active')
          );

          if (
            solutionImg.getBoundingClientRect().top < window.innerHeight &&
            !solutionImg.getBoundingClientRect().top <= 0
          ) {
            solutionImg.children[0].classList.add('active');
            solutionImg.children[1].classList.add('active');
          } else {
            solutionImg.children[0].classList.remove('active');
            solutionImg.children[1].classList.remove('active');
          }

          if (solutionImg.getBoundingClientRect().top <= 0) {
            solutionImg.children[0].classList.remove('active');
            solutionImg.children[1].classList.remove('active');
          }
        });
      }

      //*! Service Section Scroll Animation *

      const allServicesTitleSpans = document.querySelectorAll(
        '.hpt-services .title span.title_span_text'
      );

      const allServicesSubTitleSpans = document.querySelectorAll(
        '.hpt-services .services-text-col .sub_title_text span.sub_title_span_text'
      );

      const allServicesIntroTextSpans = document.querySelectorAll(
        '.hpt-services .services-big-text-col .intro_text span.intro_span_text'
      );

      const allServiceCardTitleTextSpans = document.querySelectorAll(
        '.hpt-services .card-row .card-title span.title_span_text'
      );

      const allServiceCardDescriptionTextSpans = document.querySelectorAll(
        '.hpt-services .card-row .card-body span.description_span_text'
      );

      if (window.scrollY >= 71 && service && service._id) {
        if (allServicesTitleSpans) {
          LetterAnimation(allServicesTitleSpans);
        }

        if (allServicesSubTitleSpans) {
          LetterAnimation(allServicesSubTitleSpans);
        }

        if (allServicesIntroTextSpans) {
          LetterAnimation(allServicesIntroTextSpans);
        }

        if (allServiceCardTitleTextSpans) {
          LetterAnimation(allServiceCardTitleTextSpans);
        }

        if (allServiceCardDescriptionTextSpans) {
          LetterAnimation(allServiceCardDescriptionTextSpans);
        }
      } else {
        CleanAnimation(allServicesTitleSpans);

        CleanAnimation(allServicesSubTitleSpans);

        CleanAnimation(allServicesIntroTextSpans);

        CleanAnimation(allServiceCardTitleTextSpans);

        CleanAnimation(allServiceCardDescriptionTextSpans);
      }

      //*! About Section Scroll Animation *
      const aboutNumberText = document.querySelectorAll(
        '.interface .about_component .number .number_span_text'
      );
      const aboutText = document.querySelectorAll(
        '.interface .about_component .title span.about_span_text'
      );
      const aboutTitleText = document.querySelectorAll(
        '.interface .about_component .about-big-text-col .text span.title_span_text'
      );
      const aboutDescriptionText = document.querySelectorAll(
        '.interface .about_component .text-col span.description_span_text'
      );

      if (
        interfaceData.about.name &&
        interfaceData.about.name_ar &&
        aboutText &&
        aboutNumberText
      ) {
        if (window.scrollY >= 1045) {
          LetterAnimation(aboutText);
          LetterAnimation(aboutNumberText);
          LetterAnimation(aboutTitleText);
          LetterAnimation(aboutDescriptionText);
        } else {
          CleanAnimation(aboutText);
          CleanAnimation(aboutNumberText);
          CleanAnimation(aboutTitleText);
          CleanAnimation(aboutDescriptionText);
        }
      }

      //*! Proof Section Scroll Animation *

      const proofNumberText = document.querySelectorAll(
        '.interface .proof .head_text .number .number_span_text'
      );
      const proofText = document.querySelectorAll(
        '.interface .proof .head_text .title span.proof_span_text'
      );
      const proofTitleText = document.querySelectorAll(
        '.interface .proof .title .title_text span.title_span_text'
      );
      const descriptionText = document.querySelectorAll(
        '.interface .proof .description span.description_span_text'
      );

      if (
        interfaceData.proofs.name &&
        interfaceData.proofs.name_ar &&
        proofText &&
        proofNumberText
      ) {
        if (window.scrollY >= 2008) {
          LetterAnimation(proofText);
          LetterAnimation(proofNumberText);
          LetterAnimation(proofTitleText);
          LetterAnimation(descriptionText);
        } else {
          CleanAnimation(proofText);
          CleanAnimation(proofNumberText);
          CleanAnimation(proofTitleText);
          CleanAnimation(descriptionText);
        }
      }

      //*! Partner Section Scroll Animation *

      const partnerNumberText = document.querySelectorAll(
        '.interface .partner_component .head_text .number .number_span_text'
      );

      const partnerText = document.querySelectorAll(
        '.interface .partner_component .head_text .title span.partner_span_text'
      );

      const partnerTitleText = document.querySelectorAll(
        '.interface .partner_component .partner_title .text span.title_span_text'
      );

      const partnerDescriptionText = document.querySelectorAll(
        '.interface .partner_component .description span.description_span_text'
      );

      if (interfaceData.partner) {
        if (window.scrollY >= 2775) {
          if (partnerText) {
            LetterAnimation(partnerText);
          }

          if (partnerNumberText) {
            LetterAnimation(partnerNumberText);
          }

          if (partnerTitleText) {
            LetterAnimation(partnerTitleText);
          }

          if (partnerDescriptionText) {
            LetterAnimation(partnerDescriptionText);
          }
        } else {
          CleanAnimation(partnerText);
          CleanAnimation(partnerNumberText);
          CleanAnimation(partnerTitleText);
          CleanAnimation(partnerDescriptionText);
        }
      }

      //*! About Section Scroll Animation *

      const solutionsTitleText = document.querySelectorAll(
        '.interface .solutions .provides .title span.title_span_text'
      );

      const solutionsSubTitleText = document.querySelectorAll(
        '.interface .solutions .provides .sub_title span.title_span_text'
      );

      const solutionsDescriptionText = document.querySelectorAll(
        '.interface .solutions .description span.description_span_text'
      );

      const solutionsFooterText = document.querySelectorAll(
        '.interface .solutions .footer_text span.footer_span_text'
      );
      if (interfaceData.solutions) {
        if (window.scrollY >= 3682) {
          if (solutionsTitleText) {
            LetterAnimation(solutionsTitleText);
          }

          if (solutionsSubTitleText) {
            LetterAnimation(solutionsSubTitleText);
          }

          if (solutionsDescriptionText) {
            LetterAnimation(solutionsDescriptionText);
          }

          if (solutionsFooterText) {
            LetterAnimation(solutionsFooterText);
          }
        } else {
          CleanAnimation(solutionsTitleText);
          CleanAnimation(solutionsSubTitleText);
          CleanAnimation(solutionsDescriptionText);
          CleanAnimation(solutionsFooterText);
        }
      }

      //*! News Room Section Scroll Animation *

      const newsRoomTitleText = document.querySelectorAll(
        '.interface .news-room_component .head_text .title span.news_room_span_text'
      );

      const newsRoomNumberText = document.querySelectorAll(
        '.interface .news-room_component .head_text span.number span.number_span_text'
      );

      if (window.scrollY >= 6140) {
        if (newsRoomTitleText) {
          LetterAnimation(newsRoomTitleText);
        }

        if (newsRoomNumberText) {
          LetterAnimation(newsRoomNumberText);
        }
      } else {
        CleanAnimation(newsRoomTitleText);
        CleanAnimation(newsRoomNumberText);
      }
    };
  }, [
    interfaceData,
    interfaceIsSuccess,
    isFetching,
    service,
    serviceIsSuccess,
    servicesIsSuccess,
  ]);

  if (isLoading || isFetching) return <CustomSpinner />;

  return interfaceData && interfaceData._id ? (
    <section className='interface'>
      <PageTitle>Home</PageTitle>
      <AppIntro
        headText={interfaceData?.head_text}
        headTextAr={interfaceData?.head_text_ar}
      />
      <HptServices />
      <About
        about={interfaceData?.about}
        interface_id={interfaceData?._id}
        refetchInterface={refetchInterface}
      />
      <WhyHighPoint
        interface_id={interfaceData?._id}
        refetchInterface={refetchInterface}
        proofs={interfaceData?.proofs}
      />
      <Partners partner={interfaceData?.partner} />
      <Solutions
        interface_id={interfaceData?._id}
        refetchInterface={refetchInterface}
        solutions={interfaceData?.solutions}
      />
      <NewsRoomComponent footer={interfaceData?.footer} />
      {isAdmin ? (
        <EditInterfaceForm
          interfaceData={interfaceData}
          refetchInterface={refetchInterface}
        />
      ) : null}
    </section>
  ) : isAdmin ? (
    <CreateInterfaceForm refetch={refetch} />
  ) : null;
};

export default Interface;
