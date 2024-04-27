import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Checkbox, FormControlLabel, Link, Box } from "@mui/material";

import PasswordInput from "../Form/PasswordInput";
import EmailInput from "../Form/EmailInput";
import axios from "axios";
import "./Login.scss";

export default function LoginForm() {
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
        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          if (values.rememberMe) {
            localStorage.setItem("rememberedEmail", values.email);
            localStorage.setItem("rememberedPassword", values.password);
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
          }
        }
        navigate("/");
      } catch (error) {
        setError("Invalid email or password.");
      }
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storedEmail && storedPassword) {
      formik.setFieldValue("email", storedEmail);
      formik.setFieldValue("password", storedPassword);
      formik.setFieldValue("rememberMe", true);
    }
  }, [formik]);

  const handleRememberMeChange = (e) => {
    const { name, checked } = e.target;
    formik.handleChange(e);

    if (!checked) {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  };

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
          onChange={handleRememberMeChange}
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
