import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { setSearch } from '../redux/slices/UserSlice';

const suggestionCard = props => {

  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={styles.container} onPress={() => dispatch(setSearch({text: props.value}))}>
      <View style={styles.card}>
        <Image source={props.image} style={styles.image} />
      </View>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const {height} = Dimensions.get('screen');
const cardHeight = height * 0.1;
const imageSize = height * 0.09;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: cardHeight,
    height: cardHeight,
    margin: '3%',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: '3%',
    shadowColor: 'black',
    //shadowOpacity: 1,
    //shadowRadius: 4,
    textAlign: 'center',
  },
  image: {
    //resizeMode: 'contain',
    width: imageSize,
    height: imageSize,
  },
});

export default suggestionCard;
