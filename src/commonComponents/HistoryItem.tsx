import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR } from '../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export interface HistoryItemProps {
  waterIntake: number;
  timeStamp: Date;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  waterIntake,
  timeStamp,
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="cup-water"
        size={24}
        color={PRIMARY_COLOR}
        style={styles.iconStyle}
      />
      <Text style={styles.titleStyle}>{`${waterIntake}ml`}</Text>
      <Text style={styles.timeStampeStyle}>{`${moment(timeStamp).format(
        'HH:mm',
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#Edf4f7',
    padding: 11,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
    marginVertical: 8,
  },
  iconStyle: {
    marginRight: 14,
  },
  titleStyle: {
    color: PRIMARY_TEXT_COLOR,
  },
  timeStampeStyle: { position: 'absolute', right: 0, marginRight: 20 },
});
