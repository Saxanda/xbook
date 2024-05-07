import { useState, useEffect } from 'react';
import UpdatePassword from '../components/Form/UpdatePassword';

const UpdatePasswordPage = () => {
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const resetTokenParam = searchParams.get('token'); 
    setResetToken(resetTokenParam);
  }, []);

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      <UpdatePassword resetToken={resetToken} redirectToLogin={redirectToLogin} /> 
    </div>
  );
}

export default UpdatePasswordPage;
