import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Stack, TextField, FormControl, FormHelperText, Select, InputLabel, MenuItem, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { modalEditProfile, resetEditProfileState } from '../../redux/profile/profileSlice';
import { editUser } from '../../redux/profile/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import './ModalEditProfile.scss'

export default function ModalEditProfile() {
  const dispatch = useDispatch();
  const { obj } = useSelector(state => state.profile.profileData);

  const [gender, setGender] = useState("");

  useEffect(() => {
    if (obj) {
      setGender(obj.gender);
    }
  }, [obj]);

  const validationSchema = yup.object({
    name: yup.string(),
    surname: yup.string(),
    gender: yup.string(),
    address: yup.string(),
    dob: yup.date().nullable().max(new Date(Date.now() - 567648000000), "You must be at least 18 years"),
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
    return () => {
      dispatch(modalEditProfile(false));
    };
  }, []);

  return (
    <Dialog open={modalEditProfileVal} onClose={modalEditProfileClose} fullWidth>
      <DialogTitle 
      sx={{
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(129,74,207,1) 0%, rgba(107,44,215,1) 100%)",
        color: "white"
      }}
      >Edit your profile</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={modalEditProfileClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: "white",
          fontSize: 'default'
        }}
      >
        <CloseIcon />
      </IconButton>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>

          <Stack spacing={2} margin={2}>
            <div className='form__fullName'>
              <Box sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Typography variant='subtitle2' sx={{fontWeight: "bold"}}>First name</Typography>
                <TextField 
                name='name'
                variant='outlined' 
                // label='First name'
                size="small"
                // defaultValue={obj.name}
                defaultValue={obj.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth 
                />
              </Box>

              <Box sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Typography variant='subtitle2' sx={{fontWeight: "bold"}}>Last name</Typography>
                <TextField 
                name='surname'
                variant='outlined' 
                // label='Last name'
                size="small"
                defaultValue={obj.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
                fullWidth
                />
              </Box>
            </div>

            <Box sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
              <Typography variant='subtitle2' sx={{fontWeight: "bold"}}>Date of birth</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  size="small" 
                  // label="Date of birth"
                  defaultValue={dayjs(obj.dob)}
                  onChange={(value) => formik.setFieldValue('dob', value && dayjs(value).isValid() ? value.toISOString() : '')}
                  slotProps={{
                    textField: { 
                      name: "dob",
                      size: "small",
                      error: formik.touched.dob && Boolean(formik.errors.dob),
                      helperText: formik.touched.dob && formik.errors.dob
                    }
                  }}
                />  
              </LocalizationProvider>
            </Box>

              <Box sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Typography variant='subtitle2' sx={{fontWeight: "bold"}}>Gender</Typography>
                <FormControl
                  sx={{
                    minWidth: 100,
                  }}
                >
                  {/* <InputLabel size="small" id="demo-simple-select-label">Gender</InputLabel> */}
                  <Select
                    name="gender"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    size="small"
                    onChange={(e) => {
                      setGender(e.target.value);
                      formik.setFieldValue('gender', e.target.value); 
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                  >
                    <MenuItem value={"male"}>male</MenuItem>
                    <MenuItem value={"female"}>female</MenuItem>
                    <MenuItem value={"other"}>other</MenuItem>
                  </Select>

                  {/* <FormHelperText style={{ color: "red" }}>
                    {formik.touched.gender && formik.errors.gender}
                  </FormHelperText> */}
                </FormControl>
                </Box>

              <Box sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Typography variant='subtitle2' sx={{fontWeight: "bold"}}>Address</Typography>
                <TextField 
                name='address'
                variant='outlined' 
                // label='address'
                size="small"
                defaultValue={obj.address ? obj.address : null}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
                />
              </Box>

          </Stack>
        </DialogContent>
        <DialogActions sx={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", padding: "0 36px 24px 36px"}}>
          <Button 
          sx={{
            color: "black", 
            boxShadow: "none"
          }} 
          variant='outlined' 
          type="reset" 
          onClick={modalEditProfileClose} 
          >Close</Button>
          <Button 
          sx={{
            boxShadow: "none",
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(129,74,207,1) 0%, rgba(107,44,215,1) 100%)"
          }} 
          color="primary" 
          variant='contained' 
          type='submit'
          >Save</Button>
        </DialogActions>
      </form>
    </Dialog>
    

  )
}