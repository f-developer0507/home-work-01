import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../service";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SignUpModal } from '@modal';

const Index = () => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      full_name: "",
      password: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      full_name: Yup.string().required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      phone_number: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await auth.sign_up(values);
        if (response.status === 200) {
          setOpen(true);
          localStorage.setItem("email", values.email);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <SignUpModal open={open} handleClose={() => setOpen(false)} />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-8 text-[50px]">Register</h1>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <TextField
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="card-user"
              id="email"
              label="Email"
              variant="outlined"
            />
            <TextField
              type="text"
              name="full_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.full_name}
              error={formik.touched.full_name && Boolean(formik.errors.full_name)}
              helperText={formik.touched.full_name && formik.errors.full_name}
              className="card-user"
              id="full_name"
              label="Full name"
              variant="outlined"
            />
            <TextField
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className="card-user"
              id="password"
              label="Password"
              variant="outlined"
            />
            <TextField
              type="text"
              name="phone_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              helperText={formik.touched.phone_number && formik.errors.phone_number}
              className="card-user"
              id="phone_number"
              label="Phone number"
              variant="outlined"
            />
            <Button type="submit" variant="contained">Sign-up</Button>
          </form>
        </div>     
      </div>
    </>
  );
};

export default Index;
