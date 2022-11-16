import Spinner from 'react-bootstrap/Spinner';

const CustomSpinner = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      className='d-block bg-dark text-light my-3 m-auto'
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};

export default CustomSpinner;
