import * as Yup from "yup";

const signupSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Enter your full name"),
    email: Yup.string()
      .email("Invalid email")
      .required("Enter your email address"),
    password: Yup.string()
      .min(8)
      .required("Enter your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
      confirmPassword: Yup.string()
      .min(8)
      .required("Confirm your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
  });


  const signinSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("enter your email address"),
    password: Yup.string()
      .min(8)
      .required("Enter your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      )
  });

  const confirmPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8)
      .required("Enter your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
      confirmPassword: Yup.string()
      .min(8)
      .required("Confirm your password.")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*+-]).{8,}$/,
        "Must contain at least one uppercase letter, one number, and one special character"
      ),
  });

  const resetEmailPSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("enter your email address"),
  });



  export {
    signupSchema,
    signinSchema,
    confirmPasswordSchema,
    resetEmailPSchema
  }