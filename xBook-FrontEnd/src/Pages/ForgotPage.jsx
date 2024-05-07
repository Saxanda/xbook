import Forgot from "../components/Forgot/Forgot"


export default function ForgotPage (){
    return(
        <>
        <Forgot></Forgot>
        </>
    )
}

// PasswordReset.jsx

// import ForgotPasswordForm from '../components/Forgot/Forgot';
// import { useState } from 'react';

// const PasswordReset = () => {
//   const [resetToken, setResetToken] = useState('');

//   const handleFirstStepComplete = (token) => {
//     setResetToken(token);
//   };

//   return (
//     <div>
//       {!resetToken && <ForgotPasswordForm onComplete={handleFirstStepComplete} />}
//     </div>
//   );
// }

// export default PasswordReset;

