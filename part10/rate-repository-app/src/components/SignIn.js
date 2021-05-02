import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import SignInForm from './SignInForm';

const validateSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be greater or equal to 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be greater or equal to 3 characters')
    .required('Password is required'),
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={values => console.log(values)}
      validationSchema={validateSchema}
    >
      {props => <SignInForm {...props} />}
    </Formik>
  );
};

export default SignIn;
