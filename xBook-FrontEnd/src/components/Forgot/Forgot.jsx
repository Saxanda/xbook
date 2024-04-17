import { useState } from 'react';
import axios from 'axios';
import "./Forgot.scss"

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  

    try {
      const response = await axios.post('/send-password-reset', { email });
      setMessage(response.data);
    } catch (error) {
      setMessage('Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
    }
  };

  return (
    
    <div className="password-reset-container">
      <form onSubmit={handleSubmit}>
        <h2>Поиск аккаунта</h2>
        <p>Чтобы найти свой аккаунт, введите ваш электронный адрес или номер мобильного телефона.</p>
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
        <button type="submit">Поиск</button>
        <button type="button">Отменить</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}


