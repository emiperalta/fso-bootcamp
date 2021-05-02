import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.ligth,
    padding: theme.paddings.high,
  },
  input: {
    height: 50,
    fontSize: theme.fontSizes.subheading,
    borderColor: theme.colors.graylight,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: theme.paddings.high,
    borderRadius: theme.borders.normal,
  },
  errorInput: {
    height: 50,
    fontSize: theme.fontSizes.subheading,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: theme.paddings.high,
    borderRadius: theme.borders.normal,
  },
  button: {
    backgroundColor: theme.background.blue,
    borderRadius: theme.borders.normal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: theme.colors.error,
    marginBottom: theme.margins.normal,
  },
});

const SignInForm = props => {
  return (
    <View style={styles.container}>
      <TextInput
        onBlur={props.handleBlur('username')}
        onChangeText={props.handleChange('username')}
        placeholder='Username'
        style={props.errors.username ? styles.errorInput : styles.input}
        value={props.values.username}
      />
      <Text style={styles.errorMessage}>
        {props.touched.username && props.errors.username}
      </Text>

      <TextInput
        onBlur={props.handleBlur('password')}
        onChangeText={props.handleChange('password')}
        placeholder='Password'
        style={props.errors.password ? styles.errorInput : styles.input}
        secureTextEntry={true}
        value={props.values.password}
      />
      <Text style={styles.errorMessage}>
        {props.touched.password && props.errors.password}
      </Text>

      <Button onPress={props.handleSubmit} title='Sign in' />
    </View>
  );
};

export default SignInForm;
