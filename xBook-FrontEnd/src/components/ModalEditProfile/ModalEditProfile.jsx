import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Stack, TextField, FormControl, FormHelperText, Select, InputLabel, MenuItem, Typography, Box} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { modalEditProfile, resetEditProfileState } from '../../redux/profile/profileSlice';
import { editUser } from '../../redux/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";

export default function ModalEditProfile() {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState(false);
  const [surnameInput, setSurnameInput] = useState(false);
  const [dobInput, setDobInput] = useState(false);
  const [addressInput, setAddressInput] = useState(false);
  const [genderInput, setGenderInput] = useState(false);

  const validationSchema = yup.object({
    name: yup.string(),
    surname: yup.string(),
    gender: yup.string(),
    address: yup.string(),
    dob: yup.date().max(new Date(Date.now() - 567648000000), "You must be at least 18 years"),
  });

  const modalEditProfileVal = useSelector((state) => state.profile.modalEditProfile.state);
  const userProfileObj = useSelector(state => state.profile.profileData.obj);

  const modalEditProfileClose = () => {
    dispatch(modalEditProfile(false));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      gender: "",
      address: "",
      dob: "",
    },
    
    validationSchema: validationSchema,

    onSubmit: (userData) => {
      const obj = {};
      for (const key in userData) {
        if (userData[key] !== "") {
          obj[key] = userData[key];
        }
      }

      const authObj ={
        id: userProfileObj.id,
        userObj: obj, 
      }

      dispatch(editUser(authObj));
      dispatch(modalEditProfile(false));
      dispatch(resetEditProfileState());
    }

    
  });

  useEffect(() => {
    return ()=>{
      dispatch(modalEditProfile(false));
    };
  }, []);


  return (
    <Dialog open={modalEditProfileVal} onClose={modalEditProfileClose} fullWidth>
      <DialogTitle>Edit bio</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={modalEditProfileClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>

          <Stack spacing={2} margin={2}>

            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant='h6'>Name: {userProfileObj.name}</Typography>
              <div>
                <Button variant='contained' onClick={() => setNameInput((value) => !value)} startIcon={<EditIcon />}>Edit</Button>
              </div>
            </Box>
            {nameInput ?
              <TextField 
              name='name'
              variant='outlined' 
              label='First name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth 
              />
              :
              null
            }

            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant='h6'>Surname: {userProfileObj.surname}</Typography>
              <div>
                <Button variant='contained' onClick={() => setSurnameInput((value) => !value)} startIcon={<EditIcon />}>Edit</Button>
              </div>
            </Box>
            {
              surnameInput ?
              <TextField 
              name='surname'
              variant='outlined' 
              label='Last name'
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
              fullWidth
              />
              :
              null
            }

            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant='h6'>Date of birth: {userProfileObj.dob}</Typography>
              <div>
                <Button variant='contained' onClick={() => setDobInput((value) => !value)} startIcon={<EditIcon />}>Edit</Button>
              </div>
            </Box>
            {
              dobInput ?
              <TextField
                id="dob"
                label="Date"
                type="date"
                {...formik.getFieldProps("dob")}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
              />
              :
              null
            }

            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant='h6'>Gender: {userProfileObj.gender ? userProfileObj.gender : null}</Typography>
              <div>
                <Button variant='contained' onClick={() => setGenderInput((value) => !value)} startIcon={<EditIcon />}>Edit</Button>
              </div>
            </Box>
            {
              genderInput ?
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
              :
              null
            }

            <Box sx={{display: "flex", justifyContent: "space-between"}}>
              <Typography variant='h6'>Address: {userProfileObj.address ? userProfileObj.address : null}</Typography>
              <div>
                <Button variant='contained' onClick={() => setAddressInput((value) => !value)} startIcon={<EditIcon />}>Edit</Button>
              </div>
            </Box>
            {
              addressInput ?
              <TextField 
              name='address'
              variant='outlined' 
              label='address'
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              fullWidth
              />
              :
              null
            }
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant='contained' type='submit'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>

  )
}