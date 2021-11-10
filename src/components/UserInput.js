import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const userInput = props => {

  const emailIcon = <Icon name={props.icon} size={30} color="black" />;

  return (
    <View style={[styles.container, {height: props.height}]}>
      <View style={styles.icon}>
        <Text>{emailIcon}</Text>
      </View>
      <View style={styles.inputField}>
        <TextInput
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    //backgroundColor: 'rgb(176,196,222)',
    //marginBottom: '3%',
    borderRadius: 10,
    borderWidth: 2
  },
  inputField: {
    paddingLeft: 10,
    //backgroundColor: 'blue',
    width: '87%',
    height: '100%'
  },
  input: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderRightWidth: 1,
    height: '90%',
    width: '13%',
    borderRightColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default userInput;
