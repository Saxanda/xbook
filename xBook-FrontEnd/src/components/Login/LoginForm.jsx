import React from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Checkbox, FormControlLabel, Link} from "@mui/material";

import PasswordInput from "../Form/PasswordInput";
import EmailInput from "../Form/EmailInput";



import "./Login.scss";
import useAxios from "../../helpers/UseAxios";

export default function LoginForm() {
  const navigate = useNavigate();


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
    },
    validationSchema: validationSchema,
    onSubmit: 
    // (values)=>{
    //   console.log(values);
    // }
    
    
    
    (values) => {
      useAxios('http://localhost:8080/api/v1/auth/login', values)
    }
  })
    
  

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

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
      <Link href="" underline="hover" onClick={() => {navigate('/forgot-page')}}>
        Forgot your password?
      </Link>
      
    </form>
  );
}
