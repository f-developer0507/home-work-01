import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../service";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom"

const Index = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await auth.sign_in(values);
        if (response.status === 200) {
          localStorage.setItem("access_token", response.data.access_token);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-[600px] p-5">
        <h1 className="text-center my-8 text-[50px]">Login</h1>
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
          <Button type="submit" variant="contained">Sign-in</Button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>     
    </div>
  );
};

export default Index;
