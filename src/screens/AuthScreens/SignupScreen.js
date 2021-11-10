import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../assets/logo.png';
import FormButton from '../../components/FormButton';
import UserInput from '../../components/UserInput';
import {useDispatch} from 'react-redux';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, getFirestore } from "firebase/firebase-firestore"; 


const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  const onSignup = () => {
    const auth = getAuth();
    //const db = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      //collection("users").doc(user.uid).set({name, email})
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <UserInput
          placeholder="Name"
          onChangeText={setName}
          icon="person-outline"
          height="20%"
        />
        <UserInput
          placeholder="Email"
          onChangeText={setEmail}
          icon="mail-outline"
          height="20%"
        />
        <UserInput
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
          icon="finger-print-outline"
          height="20%"
        />
        <FormButton
          title="Signup"
          backgroundColor="rgb(255,255,102)"
          height="18%"
          action={onSignup}
        />
      </View>

      <View style={styles.signincontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', {name: 'Login'})}>
          <Text style={styles.signIn}>Sign In Instead</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.altLoginContainer}>
        <FormButton
          title="Sign In With Facebook"
          backgroundColor="rgb(100,149,237)"
          navigation={navigation}
          navigate="Home"
          height="30%"
        />
        <FormButton
          title="Sign In With Google"
          backgroundColor="rgb(255,160,122)"
          action={createUserWithEmailAndPassword}
          height="30%"
        />
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const logo_height = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,250)',
    justifyContent: 'space-evenly',
  },
  header: {
    alignItems: 'center',
    marginTop: '10%',
  },
  logo: {
    height: logo_height,
    width: logo_height,
    borderRadius: 80,
    marginBottom: '10%',
    alignItems: 'center',
  },
  signIn: {
    textAlign: 'center',
    fontSize: 16,
  },
  inputContainer: {
    //backgroundColor: 'green',
    width: '100%',
    height: '30%',
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
});

export default SignupScreen;
