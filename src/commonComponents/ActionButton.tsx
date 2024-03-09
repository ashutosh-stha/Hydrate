import { Button } from '@rneui/themed';
import React from 'react';
import * as Color from '../assets/colors';
import { StyleSheet } from 'react-native';

export interface ActionButtonProps {
  onPress?: () => void;
  buttonStyle?: object;
  containerStyle?: object;
  titleStyle?: object;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  buttonStyle,
  containerStyle,
  titleStyle,
}) => {
  return (
    <Button
      title="Calculate"
      onPress={onPress}
      containerStyle={[styles.containerStyle, containerStyle]}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 20,
  },
  buttonStyle: {
    borderRadius: 8,
    paddingVertical: 16,
    backgroundColor: Color.PRIMARY_COLOR,
  },
  titleStyle: {
    fontWeight: 'bold',
  },
});
