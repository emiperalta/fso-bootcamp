import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

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
    marginBottom: theme.margins.high,
  },
  button: {
    backgroundColor: theme.background.blue,
    borderRadius: theme.borders.normal,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SignInForm = ({ handleChange, handleSubmit, values }) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={handleChange('username')}
        placeholder='Username'
        style={styles.input}
        value={values.username}
      />
      <TextInput
        onChangeText={handleChange('password')}
        placeholder='Password'
        style={styles.input}
        secureTextEntry={true}
        value={values.password}
      />
      <Button onPress={handleSubmit} style={styles.button} title='Sign in' />
    </View>
  );
};

export default SignInForm;
