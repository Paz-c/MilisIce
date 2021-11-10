import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Logo from '../../assets/logo.png';
import FormButton from '../../components/FormButton';
import UserInput from '../../components/UserInput';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();
  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <UserInput
          onChangeText={setEmail}
          placeholder="Email"
          icon="person-outline"
          height="25%"
        />
        <UserInput
          onChangeText={setPassword}
          placeholder="Password"
          icon="finger-print-outline"
          height="25%"
        />
        <FormButton
          title="Login"
          backgroundColor="rgb(255,255,102)"
          height="23%"
          action={onLogin}
        />
      </View>
      <View style={styles.recoverPasswordContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoverPassword')}>
          <Text style={styles.textLinks}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.altLoginContainer]}>
        <FormButton
          title="Sign In With Facebook"
          backgroundColor="rgb(100,149,237)"
          icon="logo-facebook"
          navigation={navigation}
          navigate="History"
          height="30%"
        />
        <FormButton
          title="Sign In With Google"
          backgroundColor="rgb(255,160,122)"
          icon="logo-google"
          navigation={navigation}
          navigate="Main"
          height="30%"
        />
      </View>
      <View style={styles.signupContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textLinks}>Create Account Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const logo_height = height * 0.2;
const containerSize = height * 0.5;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,250)',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  header: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    //marginBottom: '10%',
    //backgroundColor: 'blue',
  },
  logo: {
    height: logo_height,
    width: logo_height,
    borderRadius: 80,
  },
  textLinks: {
    fontSize: 16,
  },
  inputContainer: {
    //backgroundColor: 'green',
    width: '100%',
    height: '25%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  recoverPasswordContainer: {
    //backgroundColor: 'pink',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  altLoginContainer: {
    //backgroundColor: 'violet',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '18%',
    justifyContent: 'space-evenly',
  },
  signupContainer: {
    //backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
