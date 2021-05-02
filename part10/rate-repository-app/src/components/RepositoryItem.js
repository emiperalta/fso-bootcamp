import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  mainSection: {
    flex: 1,
    flexDirection: 'row',
  },
  subhead: {
    flex: 2,
    paddingLeft: 15,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item }) => {
  const kFormatter = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainSection}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.subhead}>
          <Text fontWeight='bold' style={{ marginBottom: 5 }}>
            {item.fullName}
          </Text>
          <Text color='textSecondary' style={{ marginBottom: 5 }}>
            {item.description}
          </Text>
          <Text primaryTextBg='primary' style={{ marginBottom: 5 }}>
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text fontWeight='bold'>{kFormatter(item.stargazersCount)}</Text>
        <Text fontWeight='bold'>{kFormatter(item.forksCount)}</Text>
        <Text fontWeight='bold'>{kFormatter(item.reviewCount)}</Text>
        <Text fontWeight='bold'>{kFormatter(item.ratingAverage)}</Text>
      </View>
      <View style={styles.section}>
        <Text color='textSecondary'>Starts</Text>
        <Text color='textSecondary'>Forks</Text>
        <Text color='textSecondary'>Reviews</Text>
        <Text color='textSecondary'>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItem;
