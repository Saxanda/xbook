import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Checkbox, FormControlLabel, Link, Box } from "@mui/material";

import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/authSlice";

import PasswordInput from "../Form/PasswordInput";
import EmailInput from "../Form/EmailInput";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import "./Login.scss";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          {
            email: values.email,
            password: values.password,
          },
         
          {
            "Content-Type": "application/json",
            accept: "*/*",
          }
        );
        const {token,email}  = response.data;
        // const decodedToken = jwtDecode(token);
        // const userEmail = decodedToken.email;
        // console.log('Decoded token:', decodedToken);
        // console.log('User email:', userEmail);
        // const user= jwtDecode(token);
        //   console.log(user);
     
        dispatch(setEmail(email));

        if (values.rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        navigate("/");
      } catch (error) {
        setError("Invalid email or password.");
      }
    },
  });

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   sessionStorage.removeItem('token');
  //   dispatch(clearAuthData());

  // };

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <EmailInput
        email={formik.values.email}
        handleEmail={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <PasswordInput
        password={formik.values.password}
        handlePassword={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <label>
        <input
          type="checkbox"
          name="rememberMe"
          checked={formik.values.rememberMe}
          onChange={formik.handleChange}
        />
        Remember Me
      </label>
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary"  
        checked={formik.values.rememberMe}
        onChange={handleRememberMeChange}
        />}
        label="Remember me"
      /> */}
      {error && <Box sx={{ color: "red" }}>{error}</Box>}

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
      <Link
        href=""
        underline="hover"
        onClick={() => {
          navigate("/forgot-page");
        }}
      >
        Forgot your password?
      </Link>
    </form>
  );
}
