import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/OtherScreens/SplashScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';

import SignupScreen from './src/screens/AuthScreens/SignupScreen';
import {store} from './src/redux/Store';
import MyTabs from './src/screens/TabScreens/MyTabs';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import CheckoutScreen from './src/screens/OtherScreens/CheckoutScreen';
const firebaseConfig = {
  apiKey: 'AIzaSyD2UFpOk6U-i7VWkLo033o1AIfm-WFfx_0',
  authDomain: 'milisice1.firebaseapp.com',
  projectId: 'milisice1',
  storageBucket: 'milisice1.appspot.com',
  messagingSenderId: '485176111152',
  appId: '1:485176111152:web:f356eaf403c846d550fdf5',
  measurementId: 'G-ZFHY999W0T',
};
initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    background: 'rgb(230,230,250)',
    card: 'rgb(230,230,250)',
  },
};

const App = () => {
  const [isLoggedInUid, setIsLoggedInUid] = useState(true);
  {/*const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setIsLoggedInUid(uid)
      // ...
    } else {
      // User is signed out
      setIsLoggedInUid(null)
      // ...
    }
  });   */}
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        {isLoggedInUid === true ? (
          // Screens for logged in users
          <MyTabs />
        ) : (
          // Auth screens
          <Stack.Navigator>
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Group>
          </Stack.Navigator>
        )}
        {/* other screens */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
