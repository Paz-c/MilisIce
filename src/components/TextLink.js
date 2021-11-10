import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const TextLink = props => {
  return (
    <View style={[{marginBottom: props.marginBottom}, styles.container]}>
      {props.content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'green',
    //marginTop: '10%',
  },
});

export default TextLink;
