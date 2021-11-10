import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../../assets/logo.png';
import * as Animatable from 'react-native-animatable';



const SplashScreen = ({navigation}) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          source={Logo}
          style={styles.image}
          animation="bounceIn"
          duration={7000}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login', {name: 'Login'})}>
        <Animatable.View
          style={styles.footer}
          animation="fadeInUpBig"
          duration={2000}>
          <Text style={{fontSize: 16}}>Get Started</Text>
        </Animatable.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('screen');
const logo_height = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,250)',
  },
  image: {
    height: logo_height,
    width: logo_height,
    borderRadius: 120,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'rgb(255,255,102)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 30,
    marginLeft: '30%',
    width: '70%',
  },
});

export default SplashScreen;
