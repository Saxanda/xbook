import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Box
} from "@mui/material";
import PasswordInput from "../Form/PasswordInput";
import EmailInput from "../Form/EmailInput";
import Modal from "../Modal/ModalLogin";
import axios from "axios";
import "../Login/Login.scss";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../helpers/apiConfig";

export default function SignInForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    name: yup.string().required("First name is required"),
    surname: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup
      .date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      dob: new Date(),
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log("values: ", values);
      try {
        await axios.post(
          `${API_BASE_URL}/api/v1/auth/registration`,
          values,
          {
            "Content-Type": "application/json",
            accept: "*/*",
          }
        );
        setShowModal(true);
      } catch (error) {
        setError("Something went wrong. User Registation failed");
      }
    },
  });

  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <Box className="flex">
        <TextField
          fullWidth
          id="name"
          name="name"
          label="First name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="surname"
          name="surname"
          label="Last name"
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
      </Box>

      <Box className="flex">
        <div>
          <TextField
            id="dob"
            label="Date"
            type="date"
            {...formik.getFieldProps("dob")}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </div>

        <FormControl
          sx={{
            minWidth: 100,
          }}
        >
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            name="gender"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.gender}
            label="Gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <MenuItem value={"man"}>Men</MenuItem>
            <MenuItem value={"woman"}>Woman</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>

          <FormHelperText style={{ color: "red" }}>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>
      </Box>
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
      {error && <Box sx={{ color: "red" }}>{error}</Box>}
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
      {showModal && (
        <Modal
          open={showModal}
          handleClose={closeModal}
          title={"Registration was successful"}
          text={`To complete the registration, go to the mail ${formik.values.email} for confirmation`}
        />
      )}
    </form>
  );
}
