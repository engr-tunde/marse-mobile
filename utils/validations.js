import * as yup from "yup";

export const signupSchema = () => {
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Enter your full name"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Enter your email address"),
    password: yup
      .string()
      .min(8)
      .required("Enter your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-_]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .min(8)
      .required("Confirm your password.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return validationSchema;
};

export const loginSchema = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("enter your email address"),
    password: yup.string().required("Enter your password."),
  });
  return validationSchema;
};

export const confirmPasswordSchema = () => {
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(8)
      .required("Enter your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .min(8)
      .required("Confirm your password.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return validationSchema;
};

export const resetEmailPSchema = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("enter your email address"),
  });
  return validationSchema;
};

export const shippingAddressSchema = () => {
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Enter your full name"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Enter your email address"),
    phoneNumber: yup.string().required("Enter your phone number"),
    country: yup.string().required("Enter your country"),
    city: yup.string().required("Enter your city"),
    state: yup.string().required("Enter your state"),
    street: yup.string().required("Enter your street address"),
    addressLabel: yup.string().required("Enter your address label"),
    postalCode: yup.string().required("Enter your postal code"),
  });

  return validationSchema;
};

export const changePasswordSchema = () => {
  const validationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8)
      .required("Enter your current password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
    password: yup
      .string()
      .min(8)
      .required("Enter your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .min(8)
      .required("Confirm your password.")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });
  return validationSchema;
};
