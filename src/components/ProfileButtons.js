import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ProfileButtons = props => {
  return (
    <View style={[styles.topup, {marginTop: props.marginTop, width: props.width}]}>
      <Text style={{color: 'rgb(230,230,250)'}}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    topup: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        height: '70%',
        backgroundColor: 'black'
      },
});

export default ProfileButtons;
