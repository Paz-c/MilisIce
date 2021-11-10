import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addToCartItems, removeCartItem } from '../redux/slices/UserSlice';

const CheckoutItem = props => {
  const dispatch = useDispatch()
  const deleteIcon = (
    <Icon name="trash-outline" size={25} color="rgb(230,230,250)" />
  );
  const price = props.price.toLocaleString()

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageView}>
        <Image source={props.image} style={styles.image} />
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.title}>{props.flavor}</Text>
        <Text style={styles.price}>₦{price}</Text>
        <Text style={styles.size}>Size: {props.size}</Text>
        <Text style={styles.amount}>Amount: {props.amount}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(addToCartItems({id: props.id}))} style={styles.iconView}>{deleteIcon}</TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'green',
    flexDirection: 'row',
    marginBottom: '3%',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 140,
  },
  imageView: {
    borderWidth: 1,
    width: '25%',
    height: '100%',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'rgb(230,230,250)'
  },
  detailsView: {
    width: '65%',
    padding: '4%',
  },
  iconView: {
    width: '10%',
    justifyContent: 'center',
  },
  title: {
    //backgroundColor: 'pink',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '2%',
    color: 'red',
  },
  price: {
    //backgroundColor: 'orange',
    //fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '8%',
    color: 'rgb(230,230,250)',
  },
  size: {
    //backgroundColor: 'blue',
    marginBottom: '2%',
    color: 'rgb(230,230,250)',
  },
  amount: {
    color: 'rgb(230,230,250)',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default CheckoutItem;
