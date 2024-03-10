import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ControlledTextInput } from '../../commonComponents/ControlledTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionButton } from '../../commonComponents/ActionButton';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../model/store';

export const LoginScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLoginPress = () => {
    dispatch.authentication.signInUserWithEmail({ email, password });
  };

  const onSignUpPress = () => {
    dispatch.authentication.createUserWithEmail({ email, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Hydrate</Text>
        <ControlledTextInput
          title="Email"
          keyboardType="email-address"
          value={email}
          onChange={setEmail}
        />
        <ControlledTextInput
          title="Password"
          keyboardType="default"
          value={password}
          onChange={setPassword}
          secureTextEntry={true}
        />
        <ActionButton
          title="Login"
          onPress={onLoginPress}
          containerStyle={styles.buttonContainer}
        />

        <ActionButton
          title="Sign Up"
          onPress={onSignUpPress}
          containerStyle={styles.buttonContainer}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 28,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    paddingHorizontal: 0,
    marginBottom: 10,
  },
});
