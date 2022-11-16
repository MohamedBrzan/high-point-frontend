import Spinner from 'react-bootstrap/Spinner';
import './CustomSpinner.css';

const CustomSpinner = () => {
  return (
    <div className='custom_spinner'>
      <Spinner animation='border' role='status' className='icon'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;
