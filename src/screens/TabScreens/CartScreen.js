import React, {useState, useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CartItems from '../../components/CartItems';
import {useSelector, useDispatch} from 'react-redux';
import {addToFavorites} from '../../redux/slices/UserSlice';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckoutScreen from '../OtherScreens/CheckoutScreen';
import PayNowScreen from '../OtherScreens/PayNowScreen';

const Stack = createNativeStackNavigator();

function CartView({navigation}) {
  const items = useSelector(state => state.user.cartItems);
  const dispatch = useDispatch();
  const callChildSetPrice = useRef(null)
  const displayCartItems = items.map((items, i) => {
    return (
      <CartItems
        flavor={items.flavor}
        price={items.price}
        smallPrice={items.smallPrice}
        mediumPrice={items.mediumPrice}
        largePrice={items.largePrice}
        orderSize={items.orderSize}
        image={items.image}
        key={i}
        amount={items.amount}
        id={items.id}
        addToFavorites={() => dispatch(addToFavorites({id: items.topping}))}
        favorite={items.favorite}
        topping={items.topping}
        callSetPrice={callChildSetPrice}
      />
    ); 
  });
  return (
    <SafeAreaView>
      <ScrollView style={styles.body}>
        {items.length === 0 ? (
          <View style={styles.centeredView}>
            <Text>WoW, Such Empty!</Text>
          </View>
        ) : (
          displayCartItems
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={items.length == 0}
          onPressIn={() => callChildSetPrice.current()}
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkout}>
          <Text style={{color: 'whitesmoke'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CartScreen = () => {

  const cartArrayCheck = useSelector(state => state.user.cartItems.length);
  const [cartArray, setCartArray] = useState(false)

  useEffect(() => {
    {cartArrayCheck ? setCartArray(true) : setCartArray(false)}
  }, [cartArrayCheck])
  

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="CartView" component={CartView} />
      </Stack.Group>
      {cartArray ? (
        <Stack.Group>
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="PayNow" component={PayNowScreen} />
        </Stack.Group>
      ) : null}
    </Stack.Navigator>
  );
};

const {height} = Dimensions.get('screen');
const screenHeight = height * 0.8;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    //#2196F3
  },
  body: {
    //backgroundColor: 'blue',
    height: '90%',
  },
  footer: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
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

export default CartScreen;
