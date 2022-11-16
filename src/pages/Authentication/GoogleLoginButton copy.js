import { GoogleLogin } from 'react-google-login';

import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/reducers/User/UserSlice';
import { useGoogleLoginUserMutation } from '../../store/apis/User/User';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [googleLogin, { isLoading: userLogging }] =
    useGoogleLoginUserMutation();

  const onSuccess = async (res) => {
    try {
      if (res.profileObj.email) {
        await googleLogin({ email: res?.profileObj?.email }).then(
          (response) => {
            if (response.data) {
              dispatch(createUser(response.data.user));
              toast.success('User Login successfully', {
                position: 'top-center',
              });
              navigate('/');
            } else {
              toast.error(response.error.data.message, {
                position: 'top-center',
              });
            }
          }
        );
      } else {
        console.log(res.profileObj);
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };
  const onFailure = (res) => console.log('error', res);
  return (
    <GoogleLogin
      clientId={process.env.CLIENT_ID}
      buttonText='Sign in with Google'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      //   isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;
