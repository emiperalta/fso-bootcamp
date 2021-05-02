import React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeigths.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextLigth: {
    color: theme.colors.ligth,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  errorColor: {
    color: theme.colors.error,
  },
  primaryTextBg: {
    color: theme.colors.ligth,
    backgroundColor: theme.background.blue,
    padding: theme.paddings.normal,
    borderRadius: theme.borders.normal,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHead: {
    fontSize: theme.fontSizes.head,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeigths.bold,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  primaryTextBg,
  style,
  text,
  ...props
}) => {
  const textStyle = [
    styles.text,
    text === 'light' && styles.colorTextLigth,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'error' && styles.errorColor,
    primaryTextBg === 'primary' && styles.primaryTextBg,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'head' && styles.fontSizeHead,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
