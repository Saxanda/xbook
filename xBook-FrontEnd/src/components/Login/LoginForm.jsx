import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {Button, Checkbox, FormControlLabel} from "@mui/material";

import PasswordInput from "../Form/PasswordInput";
import EmailInput from "../Form/EmailInpur";
import "./Login.scss";




export default function LoginForm() {
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
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

        <a className="link-forgot">Forgot your password?</a>
      </form>
    </div>
  );
}
