import React from 'react';
import {StyleSheet, View, Modal, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/slices/UserSlice';

const OrderPlacedModal = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text
                style={{
                  fontWeight: 'bold', textAlign: 'center',
                  fontSize: 25,
                  color: 'red',
                }}>
                Order Placed
              </Text>
            </View>
            <View style={styles.body}>
              <Text
                style={{
                  color: 'rgb(230,230,250)',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Your order has been placed successfully. Please tap on the OK
                button to track your order
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPressIn={() => [
                  props.navigation.navigate('Track'),
                  dispatch(clearCart()),
                ]}
                onPress={props.closeModal}
                style={[styles.button, styles.buttonClose]}>
                <Text style={styles.footerTextStyle}>Track</Text>
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
    width: '93%',
    height: '40%',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    height: '10%',
    //backgroundColor: 'green',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  body: {
    height: '73%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  footer: {
    height: '15%',
    //backgroundColor: 'green',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default OrderPlacedModal;
