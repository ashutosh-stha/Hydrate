import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ControlledTextInput } from '../../commonComponents/ControlledTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionButton } from '../../commonComponents/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../model/store';
import { isEmpty } from 'lodash';
import { validateEmail } from '../../utils/helperFunctions';
import { RED_COLOR } from '../../assets/colors';

export const LoginScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const invalidCredentialsMessage = useSelector((state: RootState) => {
    return state.authentication.invalidCredentialsMessage;
  });

  const onSignInAndSignUpPress = (isSign: boolean) => {
    const emailErr = isEmpty(email) || !validateEmail(email);
    const passwordErr = isEmpty(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    if (emailErr || passwordErr) {
      return;
    }

    if (isSign) {
      dispatch.authentication.signInUserWithEmail({ email, password });
    } else {
      dispatch.authentication.createUserWithEmail({ email, password });
    }
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
          errorMessage="Enter a valid email address"
          error={emailError}
        />
        <ControlledTextInput
          title="Password"
          keyboardType="default"
          value={password}
          onChange={setPassword}
          secureTextEntry={true}
          errorMessage="Enter password"
          error={passwordError}
        />
        <View style={styles.invalidContainerStyle}>
          <Text style={styles.invalidCredentialsStyle}>
            {invalidCredentialsMessage}
          </Text>
        </View>
        <ActionButton
          title="Login"
          onPress={() => {
            onSignInAndSignUpPress(true);
          }}
          containerStyle={styles.buttonContainer}
        />

        <ActionButton
          title="Sign Up"
          onPress={() => {
            onSignInAndSignUpPress(false);
          }}
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
  invalidContainerStyle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  invalidCredentialsStyle: {
    color: RED_COLOR,
    alignItems: 'center',
    fontSize: 16,
  },
});
