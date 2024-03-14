import { Input } from '@rneui/themed';
import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, View } from 'react-native';
import * as Color from '../assets/colors';

export interface ControlledTextInputProps {
  title: string;
  onChange: any;
  keyboardType: KeyboardTypeOptions;
  value: string;
  maxLength?: number | undefined;
  error?: boolean;
  errorMessage?: string;
  container?: object;
  parseValue?: any;
  [key: string]: any;
}

export const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  title,
  onChange,
  keyboardType,
  value,
  maxLength,
  error,
  errorMessage,
  container,
  parseValue,
  ...rest
}) => {
  const onValueChange = (val: string) => {
    if (parseValue) {
      onChange(parseValue(val.trim()));
    } else {
      onChange(val.trim());
    }
  };
  return (
    <View style={[container]}>
      <Text style={styles.inputTitleStyle}>{title}</Text>
      <Input
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.inputStyle}
        onChangeText={onValueChange}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
        errorMessage={error ? errorMessage : undefined}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Color.GREY_COLOR,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 0,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  inputStyle: {
    margin: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    color: Color.PRIMARY_TEXT_COLOR,
  },
  inputTitleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: Color.PRIMARY_TEXT_COLOR,
  },
});
