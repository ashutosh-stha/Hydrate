import Geolocation from '@react-native-community/geolocation';
import React, { useEffect } from 'react';
import { Button, Platform, StyleSheet, Text } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';

const LOCATIONS_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.IOS.LOCATION_ALWAYS,
});

export const HomeScreen = () => {
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (locationInfo: any) => {},
      (error: any) => {},
      {
        timeout: 60 * 60 * 100,
      },
    );
  };
  useEffect(() => {
    request(LOCATIONS_PERMISSION);
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={getLocation} title="Get Location" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
