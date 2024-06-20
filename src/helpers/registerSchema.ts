import * as yup from 'yup';

const schema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    mobile: yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Password is required"),
    type: yup.string()
        .oneOf(["seller", "buyer"], "User type must be either 'seller' or 'buyer'")
        .required("User type is required")
});

export default schema;
