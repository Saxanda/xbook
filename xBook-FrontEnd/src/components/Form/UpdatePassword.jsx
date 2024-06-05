import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../helpers/apiConfig';

const UpdatePasswordForm = ({ resetToken, redirectToLogin }) => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const handleSecondSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError('Password should be of minimum 8 characters length.');
      return;
    }

    try {
      const email = localStorage.getItem('email') || ''; 
      await axios.put(`${API_BASE_URL}/api/v1/auth/update-password/${resetToken}`, { newPassword, email });
      setMessage('Password changed');
      redirectToLogin();
    } catch (error) {
      setMessage('Error changing password.');
    }
  };

  return (
    <div className="password-reset-container">
      <form onSubmit={handleSecondSubmit}>
        <h2>Change Password</h2>
        <p>Enter a new password</p>
        <div>
          <input className='firgotInput'
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter a new password"
          />
        </div>
        {error && <p style={{ color: 'black', fontSize: '15px' }}>{error}</p>}
        <div className='password-reset-button'>
          <button type="submit">Change password</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdatePasswordForm;
