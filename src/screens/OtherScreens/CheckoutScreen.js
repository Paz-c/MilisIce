import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutItem from '../../components/CheckoutItem';
import FormButton from '../../components/FormButton';
import {clearCart} from '../../redux/slices/UserSlice';

const CheckoutScreen = props => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(500);
  const [calcDiscount, setCalcDiscount] = useState(0);
  const formatTotalPrice = totalPrice.toLocaleString()
  const formatSubTotal = subTotal.toLocaleString()
  const formatDeliveryFee = deliveryFee.toLocaleString()
  const formatCalcDiscount = calcDiscount.toLocaleString()
  const backIcon = <Icon name="arrow-back-outline" size={25} color="black" />;
  const deleteIcon = <Icon name="trash-outline" size={28} color="black" />;
  const dispatch = useDispatch();
  const checkoutList = useSelector(state => state.user.cartItems);
  const discount = useSelector(state => state.user.discount);

  const extractPrices = checkoutList.map(prices => {
    const {price} = prices;
    return price;
  });

  useEffect(() => {
    let intSumPrices = [];
    for (var i = 0; i < extractPrices.length; i++)
      intSumPrices.push(parseInt(extractPrices[i]));
    const sumSubTotal = intSumPrices.reduce((a, b) => a + b, 0);
    setSubTotal(sumSubTotal);
    const sumPrices = deliveryFee + subTotal;
    const calcDiscount = (discount / 100) * sumPrices;
    const calcTotal = sumPrices - calcDiscount;
    setCalcDiscount(calcDiscount);
    setTotalPrice(calcTotal);
  }, [checkoutList, subTotal, deliveryFee, discount]);

  const checkoutItems = checkoutList.map((items, i) => {
    return (
      <CheckoutItem
        key={i}
        flavor={items.flavor}
        price={items.price}
        image={items.image}
        amount={items.amount}
        favorite={items.favorite}
        topping={items.topping}
        size={items.orderSize}
        id={items.id}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      {console.log(totalPrice)}
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity
            style={{marginRight: '2%'}}
            onPress={() => props.navigation.goBack()}>
            {backIcon}
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Checkout</Text>
          </View>
          <View style={styles.countView}>
            <Text>{checkoutList.length} item(s)</Text>
            <TouchableOpacity onPress={() => dispatch(clearCart())}>
              {deleteIcon}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.items}>{checkoutItems}</ScrollView>
      <View style={styles.summary}>
        <View style={styles.subtotal}>
          <Text>Subtotal</Text>
          <Text>₦{formatSubTotal}</Text>
        </View>
        <View style={styles.delivery}>
          <Text>Delivery Fee</Text>
          <Text>₦{formatDeliveryFee}</Text>
        </View>
        <View style={styles.discount}>
          <Text>Discount ({discount}%)</Text>
          <Text>₦{formatCalcDiscount}</Text>
        </View>
        <View style={styles.total}>
          <Text style={{fontWeight: 'bold'}}>Total</Text>
          <Text style={{fontWeight: 'bold'}}>₦{formatTotalPrice}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={checkoutList.length == 0}
          onPress={() => props.navigation.navigate('PayNow')}
          style={styles.proceed}>
          <Text style={{color: 'whitesmoke'}}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(230,230,250)',
    flex: 1,
  },
  header: {
    //padding: '2%',
    //backgroundColor: 'yellow',
    height: '18%',
    borderBottomWidth: 1,
    margin: '4%',
  },
  back: {
    //backgroundColor: 'green',
    height: '40%',
    //paddingBottom: '4%',
  },
  headerTitle: {
    //backgroundColor: 'blue',
    height: '60%',
  },
  titleView: {
    //backgroundColor: 'pink',
    height: '40%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
  },
  countView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '40%',
    paddingTop: '1%',
  },
  items: {
    height: '56%',
    //backgroundColor: 'brown',
    marginLeft: '4%',
    marginRight: '4%',
  },
  summary: {
    //backgroundColor: 'yellow',
    height: '18%',
    marginLeft: '4%',
    marginRight: '4%',
    borderTopWidth: 2,
    marginTop: '5%',
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  footer: {
    //backgroundColor: 'pink',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '4%',
    marginBottom: '0%',
    marginTop: '2%',
  },
  proceed: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: '90%',
    backgroundColor: 'black',
    height: '80%',
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  discount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
});

export default CheckoutScreen;
