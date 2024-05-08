import { useState } from 'react';
import axios from 'axios';
import './Forgot.scss';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState(''); 
  const [stage, setStage] = useState(1); 

  const handleFirstSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', { email: email });
      const token = response.data.token;
      setResetToken(token); 
      setMessage('Ссылка для сброса пароля была отправлена на почту.');
      setStage(2); 
    } catch (error) {
      setMessage('Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
    }
  };

  return (
    <div className="password-reset-container">
      {stage === 1 && (
        <form onSubmit={handleFirstSubmit}>
          <h2>Забыли пароль</h2>
          <p>Для восстановления пароля введите ваш электронный адрес</p>
          <div>
            <input
              type="email"
              name="email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Введите ваш email"
            />
          </div>
          <div className='password-reset-button'>
            <button type="submit">Отправить</button>
            <button type="button" onClick={() => window.history.back()}>Отменить</button>
          </div>
        </form>
      )}
      {stage === 2 && (
        <div className='massage' >
          <h1>Ссылка для сброса пароля была отправлена на почту.</h1>
          <div className='password-reset-button'>
            <button type="button" onClick={() => window.history.back()}>Продолжить</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordForm;
