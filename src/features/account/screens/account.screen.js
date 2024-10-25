import React from 'react';

import { Spacer } from '../../../components/spacer/spacer.component';
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from '../components/account.styles';
import LottieView from 'lottie-react-native';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <LottieView
        key="animation"
        autoPlay
        loop
        resizeMode="cover"
        source={require('../../../../assets/watermelon.json')}
        style={{ width: 300, height: 300 }}
      />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
