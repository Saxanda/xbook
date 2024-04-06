import * as React from "react";
import { useState } from "react";
import Switch from "react-switch";

import {CssBaseline, Box} from "@mui/material";

import SignInForm from "../components/SignIn/SignInForm";
import LoginForm from "../components/Login/LoginForm";



export default function LoginPage() {
  
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

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
        <Box className="form-login">
          <Box className="title-log-sign">
            <h3>Sign in</h3>
            <h3>Log in</h3>
          </Box>
          <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />

          {checked ? <SignInForm /> :<LoginForm /> }
        </Box>
      </Box>
    </>
  );
}
