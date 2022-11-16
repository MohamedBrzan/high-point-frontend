import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextAnimation from '../../../functions/TextAnimation';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import LinesAnimation from '../../../anim/LinesAnimation/LinesAnimation';
import StyledButton from '../../../common/StyledButton/StyledButton';
import './WhyHighPoint.css';
import { useTranslation } from 'react-i18next';
import CreateProofForm from './helpers/CreateProofForm';
import EditProofForm from './helpers/EditProofForm';
import { useDeleteProofMutation } from '../../../store/apis/Interface/Interface';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const WhyHighPoint = ({ interface_id, refetchInterface, proofs }) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.user);
  const isAdmin = user && user.isAdmin && user.isAdmin === true;
  const [deleteProof] = useDeleteProofMutation();

  const removeProof = async (proof_id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const checkIfTrue = confirm(t('delete.delete_proof_confirm'));

      if (checkIfTrue === true) {
        await deleteProof({ interface_id, proof_id }).then((response) => {
          if (response.data) {
            toast.success(t('delete.item_success'), {
              position: 'top-center',
            });
            refetchInterface();
          } else {
            toast.error(t(response.error.data.message), {
              position: 'top-center',
            });
          }
        });
      } else {
        return;
      }
    } catch (error) {
      return toast.error(error.message, {
        position: 'top-center',
      });
    }
  };
  return (
    <section className='why-high-point proof'>
      <Container fluid>
        <Row className='justify-content-between align-items-center'>
          <Col xs={6} className='head_text'>
            <span className='number pe-2'>
              {TextAnimation(null, 'number_span_text', null, null, '02')}
            </span>
            <span className='title'>
              {proofs && proofs.name
                ? TextAnimation(
                    'hpt_page.interface_page.proof.name',
                    'proof_span_text',
                    proofs.name,
                    proofs.name_ar,
                    null
                  )
                : null}
            </span>
          </Col>
          <Col className='why-high-point-col-btn'>
            <StyledButton
              color='white'
              borderColor='white'
              borderRightColor='white'
            >
              {t('explore_btn')}
            </StyledButton>
          </Col>
        </Row>
        <hr className='why-high-point-head-hr' />
        <Row className='why-high-point-big-text-col'>
          <Col md={4} className='why-high-point-wrapper'>
            <LinesAnimation />
          </Col>
          <Col xs={12} md={8} className='proof_content_col'>
            <div className='title'>
              {' '}
              <div className='title_text'>
                {proofs && proofs.title
                  ? TextAnimation(
                      'hpt_page.interface_page.proof.name',
                      'title_span_text',
                      proofs.title.first_text,
                      proofs.title_ar.first_text_ar,
                      null
                    )
                  : null}
              </div>
              <div className='title_text'>
                {proofs && proofs.title
                  ? TextAnimation(
                      'hpt_page.interface_page.proof.name',
                      'title_span_text',
                      proofs.title.last_text,
                      proofs.title_ar.last_text_ar,
                      null
                    )
                  : null}
              </div>
            </div>
            {isAdmin ? (
              <CreateProofForm
                interface_id={interface_id}
                refetchInterface={refetchInterface}
              />
            ) : null}
            <Row className='services-details-row'>
              {proofs && proofs.proof
                ? proofs.proof.map(({ _id, image, explain }, index) => (
                    <Col xs={12} md={6} className='proof' key={index}>
                      <div className='icon'>
                        <img
                          src={image}
                          alt='PROOF_IMAGE'
                          className='proof_img'
                        />
                        <div className='circle'></div>
                      </div>
                      <div className='text'>{explain}</div>
                      {isAdmin ? (
                        <div className='actions_btn'>
                          <EditProofForm
                            proof={{ _id, image, explain }}
                            interface_id={interface_id}
                            refetchInterface={refetchInterface}
                          />
                          <div
                            className='delete_btn'
                            onClick={() => removeProof(_id)}
                          >
                            <FontAwesomeIcon icon={faTrash} size='1x' />
                          </div>
                        </div>
                      ) : null}
                    </Col>
                  ))
                : null}
            </Row>

            <div className='description'>
              “
              {proofs && proofs.description
                ? TextAnimation(
                    'hpt_page.interface_page.proof.name',
                    'description_span_text',
                    proofs.description,
                    proofs.description_ar,
                    null
                  )
                : null}
              ”
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyHighPoint;
