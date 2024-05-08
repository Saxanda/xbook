import { useState } from 'react';
import axios from 'axios';

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
      await axios.put(`http://localhost:8080/api/v1/auth/update-password/${resetToken}`, { newPassword, email });
      setMessage('Пароль успешно изменен.');
      redirectToLogin();
    } catch (error) {
      setMessage('Ошибка изменения пароля.');
    }
  };

  return (
    <div className="password-reset-container">
      <form onSubmit={handleSecondSubmit}>
        <h2>Смена пароля</h2>
        <p>Введите новый пароль</p>
        <div>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Введите новый пароль"
          />
        </div>
        {error && <p style={{ color: 'black', fontSize: '15px' }}>{error}</p>}
        <div className='password-reset-button'>
          <button type="submit">Изменить пароль</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdatePasswordForm;
