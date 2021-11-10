import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {addHistoryToCart, addToFavorites} from '../redux/slices/UserSlice';

const HistoryItemModal = props => {
  const [favoriteName, setFavoriteName] = useState('heart-outline');
  const closeIcon = <Icon name="close" size={25} color="#e50d31" />;
  const favoriteIcon = (
    <Icon name={favoriteName} size={25} color={"red"} />
  );
  const checkCartArrayChange = useSelector(state => state.user.cartItems);
  const [cartStatus, setCartStatus] = useState('Cart');
  const dispatch = useDispatch();

  useEffect(() => {
    props.cart ? setCartStatus('UnCart') : setCartStatus('Cart');
    props.favorite
      ? setFavoriteName('heart')
      : setFavoriteName('heart-outline');
  }, [checkCartArrayChange]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <View style={styles.headerActions}>
                <TouchableOpacity onPress={props.closeModal}>
                  {closeIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(addToFavorites({id: props.id}))}>
                  {favoriteIcon}
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.headerTextStyle,
                  {fontWeight: 'bold', fontSize: 16, color: 'red'},
                ]}>
                {props.amount} {props.flavor}
              </Text>
              <Text style={styles.headerTextStyle}>{props.topping}</Text>
            </View>
            <View style={styles.body}>
              <Image source={props.image} style={styles.image} />
            </View>
            <View style={styles.footer}>
              <View style={styles.price}>
                <Text style={{color: 'rgb(230,230,250)'}}>₦{props.price}</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => dispatch(addHistoryToCart({id: props.id}))}>
                <Text style={styles.footerTextStyle}>{cartStatus}</Text>
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
    width: '80%',
    height: '60%',
    backgroundColor: 'black',
    borderRadius: 20,
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

export default HistoryItemModal;
