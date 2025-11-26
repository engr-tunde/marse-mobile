export const signupInitialValues = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return initialValues;
};

export const loginInitialValues = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return initialValues;
};

export const newPasswordInitialValues = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  return initialValues;
};

export const forgetPasswordInitialValues = () => {
  const initialValues = {
    email: "",
  };
  return initialValues;
};

export const updateProfileInitialValues = (data) => {
  const initialValues = {
    fullName: data ? data?.fullName : "",
    email: data ? data?.email : "",
    country: data ? data?.country : "",
  };
  return initialValues;
};

export const shippingAddressValues = (suppliedData) => {
  const initialValues = {
    fullName: suppliedData ? suppliedData?.fullName : "",
    email: suppliedData ? suppliedData?.email : "",
    phoneNumber: suppliedData ? suppliedData?.phoneNumber : "",
    city: suppliedData ? suppliedData?.city : "",
    country: suppliedData ? suppliedData?.country : "",
    state: suppliedData ? suppliedData?.state : "",
    street: suppliedData ? suppliedData?.street : "",
    addressLabel: suppliedData ? suppliedData?.addressLabel : "",
    postalCode: suppliedData ? suppliedData?.postalCode : "",
  };
  return initialValues;
};

export const changePasswordInitialValues = () => {
  const initialValues = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };
  return initialValues;
};
