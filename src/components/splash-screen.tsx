import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#000000',
  },
});

export default SplashScreen;