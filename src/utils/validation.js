import * as Yup from "yup";
// ========== Auth ========//

export const signInvalidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("password is required"),
  })

export const signUpvalidationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    full_name: Yup.string().required("Full name is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter").required("password is required"),
    phone_number: Yup.string().min(19, "Invalid phone number").required("Phone is required"),
  })


  // ============ Servise =========//

  export const serviceValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
  })