import { useState } from 'react';
import axios from 'axios';
import './Forgot.scss';
import API_BASE_URL from '../../helpers/apiConfig';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState(''); 
  const [stage, setStage] = useState(1); 

  const handleFirstSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/reset-password`, { email: email });
      const token = response.data.token;
      setResetToken(token); 
      setMessage('A password reset link has been sent by email.');
      setStage(2); 
      localStorage.setItem('email', email);
    } catch (error) {
      setMessage('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className="password-reset-container">
      {stage === 1 && (
        <form onSubmit={handleFirstSubmit}>
          <h2 className='titleForgot'>Forgot your password</h2>
          <p className='textForgot'>To recover your password, enter your email address</p>
          <div >
            <input className='forgotInput' 
              type="email"
              name="email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className='password-reset-button'>
            <button className='buttonForgot' type="submit">Send</button>
            <button className='buttonForgot' type="button" onClick={() => window.history.back()}>Cancel</button>
          </div>
        </form>
      )}
      {stage === 2 && (
        <div className='massage' >
          <h1 className='titleForgotTwo'>A password reset link has been sent by email.</h1>
          <div className='password-reset-button'>
            <button className='buttonForgot' type="button" onClick={() => window.history.back()}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordForm;
