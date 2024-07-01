import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { auth } from "../../service";
import {signInvalidationSchema} from "@validation"
import Notification from "@notification"
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility} from "@mui/icons-material";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  }
  const handleSubmit = async (values) => {
    try {
        const response = await auth.sign_in(values);
        if (response.status === 200) {
              Notification({title: "Success", type: "success"})
              localStorage.setItem("access_token", response?.data?.access_token);
              setTimeout(()=>{
                navigate("/main")
              }, 1500)
            }
        } catch (error) {
          Notification({title: "Error", type: "error"})
          console.log(error);
      }
  }

  return (
    <>
    <ToastContainer/>
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-[600px] p-5">
        <h1 className="text-center my-8 text-[50px]">Login</h1>
        <Formik validationSchema={signInvalidationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
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
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                { isSubmitting ? "Submitting" : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>     
    </div>
  </>
  );
};

export default Index;
