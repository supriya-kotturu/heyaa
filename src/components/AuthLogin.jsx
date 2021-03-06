import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../utils/supabase';

import FormInput from './UI/FormInput';
import Button from './UI/Button';
import Modal from './UI/Modal';

import { setErrorMessage, setSuccessMessage } from '../redux';

const AuthLogin = (props) => {
  const message = useSelector((state) => state.message);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleLogin = async (email) => {
    const message = { title: '', description: '' };

    if (email.length === 0) {
      message.title = 'Invalid email';
      message.description = 'Please enter a valid email before submitting';
      dispatch(setErrorMessage(message));
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error;

      message.title = 'Check your email!';
      message.description = "We've sent you a mail with login link.";
      dispatch(setSuccessMessage(message));
      setEmail('');
    } catch (error) {
      console.log(error);
      message.title = 'Invalid email';
      message.description = error.message || error.error_description;
      dispatch(setErrorMessage(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container  w-4/5 rounded-lg text-medium-02">
      <Modal message={message} />
      <br />
      <br />
      <br />
      <br />
      <h2 className="text-lg text-center font-bold my-3">
        Sign in via magic link with your email below
      </h2>
      {loading && (
        <p className="text-base text-center">Processing your request ... </p>
      )}
      <form
        className="my-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        <div className="w-3/4 lg:w-1/2 mx-auto my-3">
          <FormInput
            label=""
            name="email"
            type="email"
            placeholder="youremail@domain.com"
            value={email}
            handleChange={handleEmail}
          />
        </div>
        <center>
          <Button label="Send maigic link" isPrimary={true} isSubmit={true} />
        </center>
      </form>
    </div>
  );
};

export default AuthLogin;
