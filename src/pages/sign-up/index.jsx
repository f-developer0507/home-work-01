import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../../service";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility} from "@mui/icons-material";
import { SignUpModal } from '@modal';
import {signUpvalidationSchema} from "@validation"
import { useMask } from "@react-input/mask";
const Index = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const initialValues = {
    email: "",
    full_name: "",
    password: "",
    phone_number: "",
  }
  const handleSubmit = async (values) => {
    localStorage.setItem("email", values.email);
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = {...values, phone_number: `+${phone_number}`}
    try {
      const response = await auth.sign_up(payload);
      if (response.status === 200) {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  })


  return (
    <>
      <SignUpModal open={open} handleClose={() => setOpen(false)} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-8 text-[50px]">Register</h1>
          <Formik validationSchema={signUpvalidationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting })=>(
            <Form>
              <Field
              type="email"
              name="email"
              as={TextField}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              helperText={
                <ErrorMessage 
                name="email"
                component="p"
                className="text-[red] text-[15px]"
                />
              }
              />
              <Field
              type="text"
              name="full_name"
              as={TextField}
              label="Full Name"
              variant="outlined"
              margin="normal"
              fullWidth
              helperText={
                <ErrorMessage 
                name="full_name"
                component="p"
                className="text-[red] text-[15px]"
                />
              }
              />
              <Field
              type={showPassword ? "text" : "password"}
              name="password"
              as={TextField}
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              helperText={
                <ErrorMessage 
                name="password"
                component="p"
                className="text-[red] text-[15px]"
                />
              }
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              />
              <Field
              type="tel"
              name="phone_number"
              as={TextField}
              label="Phone Number"
              variant="outlined"
              margin="normal"
              fullWidth
              inputRef={inputRef}
              helperText={
                <ErrorMessage 
                name="phone_number"
                component="p"
                className="text-[red] text-[15px]"
                />
              }
              />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                { isSubmitting ? "Submitting" : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
        </div>     
      </div>
    </>
  );
};

export default Index;
