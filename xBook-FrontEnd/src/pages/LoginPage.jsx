import * as React from "react";
import { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import SignInForm from "../components/SignIn/SignInForm";
import LoginForm from "../components/Login/LoginForm";
import SwitchSelector from "react-switch-selector";


export default function LoginPage() {
  
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prevState)=>!prevState);
  
  };

  const options = [
    {
        label: "Log in",
        value: {
             logIn: true
        },

    },
    {
        label: "Sign up",
        value: "signIn",
        
    }
 ];
 
 
 const initialSelectedIndex = options.findIndex(({value}) => value === "logIn");




  return (
    <>
      <CssBaseline />

      <Box className="container-login">
        <Box>
          <h2>Xbook</h2>
          <p>
            Where Every Page Holds a Story, Connecting You to a World of
            Possibilities
          </p>
        </Box>
        <Box className="form-registration">
       <div className="switch-selector-container" style={{width: 300, height: 40}}>
         <SwitchSelector
             onChange={handleChange}
             options={options}
             initialSelectedIndex={initialSelectedIndex}
             backgroundColor={"#cfd1d9"}
             selectedBackgroundColor={"#0075e8"}
             fontSize={20}
             selectedColor={"white"}
         />
     </div> 

          { checked? <SignInForm /> : <LoginForm />}
        </Box>
      </Box>
    </>
  );
}
