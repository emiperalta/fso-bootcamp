import React from 'react';
import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#2E2E2E',
  },
  links: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.links}>
        <Link to='/'>
          <Text text='light' fontSize='head' fontWeight='bold'>
            Repositories
          </Text>
        </Link>
        <Link to='/signin'>
          <Text text='light' fontSize='head' fontWeight='bold'>
            Sign In
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
