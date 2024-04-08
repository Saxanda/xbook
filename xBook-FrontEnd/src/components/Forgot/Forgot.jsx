import { useState } from 'react';
import axios from 'axios';
import "./Forgot.scss"

export default function PasswordReset() {
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactType = contact.includes('@') ? 'email' : 'phone';
    const payload = {
      contact,
      method: contactType,
    };

    try {
      const response = await axios.post('/send-password-reset', payload);
      setMessage(response.data.message); 
    } catch (error) {
      setMessage('Ошибка при отправке запроса. Пожалуйста, попробуйте ещё раз.');
    }
  };

  return (
    
    <div className="password-reset-container">
      <form onSubmit={handleSubmit}>
        <h2>Поиск аккаунта</h2>
        <p>Чтобы найти свой аккаунт, введите ваш электронный адрес или номер мобильного телефона.</p>
        <div>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder="Введите ваш email или номер телефона"
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


