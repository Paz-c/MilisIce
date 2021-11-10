import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const formButton = props => {
  //const socialIcon = <Icon name={props.icon} size={30} color="red" />;

  return (
    <TouchableOpacity
      onPress={() => props.action()}
      style={[
        {backgroundColor: props.backgroundColor, height: props.height},
        styles.container,
      ]}
      disabled={props.disabled}>
      <Text style={[{color: props.color,}]}>
        {/*{socialIcon}*/}
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: '90%',
    //marginTop: '2%',
    //marginTop: 15,
    //marginLeft: '5%',
    //marginRight: '5%',
  },
});

export default formButton;
