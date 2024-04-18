import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box, InputLabel, MenuItem, FormControl, Select, FormHelperText} from "@mui/material";

import PasswordInput from "../Form/PasswordInput";
import EmailInput from "../Form/EmailInput";


import "../Login/Login.scss";

export default function SignInForm() {

  
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    date: yup
      .date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      date: new Date(),
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <Box className="flex">
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Box>

      <Box className="flex">
        <div>
          <TextField
            id="date"
            label="Date"
            type="date"
            {...formik.getFieldProps("date")}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
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

          <FormHelperText style={{color: 'red'}}>
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

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
