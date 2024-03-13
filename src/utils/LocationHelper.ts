import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export interface Location {
  latitude: number;
  longitude: number;
}

const permission = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
});

class LocationHelper {
  async checkPermission(): Promise<boolean> {
    try {
      const status = await check(permission);

      return status === RESULTS.GRANTED;
    } catch (error) {
      throw new Error('Error checking location permission: ' + error);
    }
  }

  async requestPermission(): Promise<void> {
    try {
      const result = await request(permission);

      if (result !== RESULTS.GRANTED) {
        throw new Error('Location permission denied.');
      }
    } catch (error) {
      throw new Error('Error requesting location permission: ' + error);
    }
  }

  async getCurrentLocation(): Promise<Location> {
    try {
      const permissionGranted: boolean = await this.checkPermission();
      if (!permissionGranted) {
        await this.requestPermission();
      }

      return new Promise<Location>((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position: { coords: { latitude: number; longitude: number } }) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error: { code: number; message: string }) => {
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      });
    } catch (error) {
      throw new Error('Error getting location: ' + error);
    }
  }
}

export default LocationHelper;
