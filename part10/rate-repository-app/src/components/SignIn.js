import React from 'react';
import { Formik } from 'formik';

import SignInForm from './SignInForm';

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={values => console.log(values)}
    >
      {props => (
        <SignInForm
          handleChange={props.handleChange}
          handleSubmit={props.handleSubmit}
          values={props.values}
        />
      )}
    </Formik>
  );
};

export default SignIn;
