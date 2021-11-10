import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import { clearCart } from '../redux/slices/UserSlice';

const OrderNowModal = props => {
  const closeIcon = <Icon name="close" size={25} color="#e50d31" />;
  const location = useSelector(state => state.user.location);
  const balance = useSelector(state => state.user.balance);
  const [authorizePayment, setAuthorizePayment] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const intPrice = parseInt(props.order.price);
  const formatOrderPrice = props.order.price.toLocaleString()

  const dispatch = useDispatch()

  useEffect(() => {
    {
      balance >= intPrice
        ? [setAuthorizePayment(true), setDisabled(false)]
        : [setAuthorizePayment(false), setDisabled(true)];
    }
  }, [balance, props.order.price]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <View style={styles.headerActions}>
                <TouchableOpacity onPress={props.closeModal}>
                  {closeIcon}
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.headerTextStyle,
                  {fontWeight: 'bold', fontSize: 16, color: 'red'},
                ]}>
                {props.amount} {props.order.flavor}
              </Text>
              <Text style={styles.headerTextStyle}>{props.order.topping}</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.imageView}>
                <Image source={props.order.image} style={styles.image} />
              </View>
              <View style={styles.destinationView}>
                <View>
                  <Text style={{color: 'rgb(230,230,250)'}}>
                    Destination: {location}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.change}>
                    <Text style={{color: 'black'}}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.price}>
                <Text style={{color: 'rgb(230,230,250)'}}>
                  ₦{formatOrderPrice}
                </Text>
              </View>
              <TouchableOpacity
                onPressIn={() => [
                  props.navigation.navigate('Track'),
                  dispatch(clearCart()),
                ]}
                onPress={props.closeModal}
                disabled={disabled}
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.footerTextStyle}>
                  {authorizePayment ? 'Pay Now' : 'Low Balance'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    //backgroundColor: 'green'
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '70%',
    backgroundColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgb(230,230,250)',
    padding: '5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: '2%',
    elevation: 2,
    height: '80%',
    width: '50%',
    justifyContent: 'center',
    //width: '80%'
  },
  buttonClose: {
    backgroundColor: 'rgb(230,230,250)',
  },
  footerTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTextStyle: {
    color: 'rgb(230,230,250)',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    height: '25%',
    //backgroundColor: 'green',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  body: {
    height: '65%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  imageView: {
    height: '70%',
    width: '100%',
  },
  destinationView: {
    //backgroundColor: 'yellow',
    height: '30%',
  },
  change: {
    backgroundColor: 'rgb(230,230,250)',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    borderRadius: 10,
    marginTop: '2%',
  },
  footer: {
    height: '10%',
    //backgroundColor: 'green',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  headerActions: {
    height: '32%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    //backgroundColor: 'green',
  },
});

export default OrderNowModal;
