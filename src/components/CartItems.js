import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToCartItems,
  decrement,
  increment,
  setOrderSize,
  setOrderPrice,
} from '../redux/slices/UserSlice';

let newPrice = []

const CartItems = props => {
  const [favoriteName, setFavoriteName] = useState('heart-outline');
  const saveIcon = <Icon name={favoriteName} size={25} color={'red'} />;
  const [newPrice, setNewPrice] = useState(0)
  const formatNewPrice = newPrice.toLocaleString()
  const closeIcon = <Icon name="close-outline" size={25} color="#e50d31" />;
  const dispatch = useDispatch();
  const [smallSizeHightlight, setSmallSizeHightlight] = useState(
    styles.sizeBtnHighlight,
  );
  const [mediumSizeHighlight, setMediumSizeHighlight] = useState(
    styles.sizeBtn,
  );
  const [largeSizeHighlight, setLargeSizeHighlight] = useState(styles.sizeBtn);
  const [orderSizeValue, setOrderSizeValue] = useState('small');
  const addIcon = (
    <Icon name="add-circle-outline" size={40} color="rgb(230,230,250)" />
  );
  const decrementIcon = (
    <Icon name="remove-circle" size={40} color="rgb(230,230,250)" />
  );

  const cartItems = useSelector(state => state.user.cartItems);
  const amountChange = cartItems.map(item => {
     const {amount, price, favorite} = item
     return amount
  })

 const resetPrice = () => {
    dispatch(setOrderPrice({id: props.id, value: newPrice}))
    console.log(props.price)
 }

  useEffect(() => {
    {
      props.favorite
        ? setFavoriteName('heart')
        : setFavoriteName('heart-outline');
    }
    {
      props.orderSize === 'small'
        ? setNewPrice(props.smallPrice * props.amount)
        : props.orderSize === 'medium'
        ? setNewPrice(props.mediumPrice * props.amount)
        : props.orderSize === 'large'
        ? setNewPrice(props.largePrice * props.amount)
        : null;
    }
    props.callSetPrice.current = resetPrice
  }, [amountChange]);

  const smallSizeHighlightHandler = () => {
    setSmallSizeHightlight(styles.sizeBtnHighlight),
      setMediumSizeHighlight(styles.sizeBtn),
      setLargeSizeHighlight(styles.sizeBtn),
      setOrderSizeValue('small');
  };
  const mediumSizeHighlightHandler = () => {
    setSmallSizeHightlight(styles.sizeBtn),
      setMediumSizeHighlight(styles.sizeBtnHighlight),
      setLargeSizeHighlight(styles.sizeBtn),
      setOrderSizeValue('medium');
  };
  const largeSizeHighlightHandler = () => {
    setSmallSizeHightlight(styles.sizeBtn),
      setMediumSizeHighlight(styles.sizeBtn),
      setLargeSizeHighlight(styles.sizeBtnHighlight),
      setOrderSizeValue('large');
  };
  const dispatchOrderSize = () => {
    dispatch(setOrderSize({id: props.id, value: orderSizeValue}));
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => dispatch(addToCartItems({id: props.id}))}>
          <Text>{closeIcon}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={props.addToFavorites} /*onPress={favoriteColorHandler}*/
        >
          <Text>{saveIcon}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.titleView}>
          <Text
            style={{
              fontSize: 23,
              textAlign: 'center',
              paddingBottom: '2%',
              color: 'red',
            }}>
            {props.flavor}
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 10,
              color: 'rgb(230,230,250)',
            }}>
            {props.topping}
          </Text>
        </View>
        <View style={styles.editView}>
          <View style={styles.size}>
            <TouchableOpacity
              onPress={dispatchOrderSize}
              onPressIn={smallSizeHighlightHandler}>
              <View style={smallSizeHightlight}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgb(230,230,250)',
                  }}>
                  S
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={dispatchOrderSize}
              onPressIn={mediumSizeHighlightHandler}>
              <View style={mediumSizeHighlight}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgb(230,230,250)',
                  }}>
                  M
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={dispatchOrderSize}
              onPressIn={largeSizeHighlightHandler}>
              <View style={largeSizeHighlight}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgb(230,230,250)',
                  }}>
                  L
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.imageView}>
            <View style={styles.item}>
              <Image source={props.image} style={styles.image} />
            </View>
            <View style={styles.amount}>
              <TouchableOpacity
                onPress={() => dispatch(decrement({id: props.id}))}>
                <Text>{decrementIcon}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 20, color: '#e50d31'}}>
                {props.amount}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(increment({id: props.id}))}>
                <Text>{addIcon} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={[styles.priceView, {backgroundColor: 'transparent'}]}>
          <Text style={{fontSize: 20, color: 'whitesmoke'}}>Price</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={{fontSize: 20, color: 'black'}}>₦{formatNewPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const paperSize = height * 0.7;

const styles = StyleSheet.create({
  main: {
    height: paperSize,
    backgroundColor: 'black',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    marginTop: '5%',
    marginLeft: '3%',
    marginRight: '3%',
    shadowColor: 'black',
    shadowOpacity: 1,
  },
  header: {
    height: '10%',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    paddingBottom: '0%',
    //backgroundColor: 'green'
  },
  body: {
    height: '80%',
    //backgroundColor: 'yellow',
  },
  footer: {
    height: '8%',
    marginTop: '2%',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  priceView: {
    backgroundColor: 'rgb(230,230,250)',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    borderRadius: 15,
  },
  editView: {
    height: '78%',
    // width: '100%',
    //backgroundColor: 'green',
    flexDirection: 'row',
  },
  titleView: {
    height: '20%',
  },
  size: {
    //backgroundColor: 'yellow',
    width: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageView: {
    alignItems: 'center',
    width: '85%',
  },
  sizeBtn: {
    width: 30,
    height: 30,
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    //borderWidth: 3,
    borderColor: 'red',
  },
  sizeBtnHighlight: {
    width: 30,
    height: 30,
    //backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgb(230,230,250)',
  },
  item: {
    //backgroundColor: 'pink',
    height: '85%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    //backgroundColor: 'orange',
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  checkout: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: '90%',
    backgroundColor: 'black',
    height: '70%',
  },
});

export default CartItems;
