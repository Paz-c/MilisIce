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
import { useSelector} from 'react-redux';
import CheckoutItem from '../../components/CheckoutItem';
import OrderPlacedModal from '../../components/OrderPlacedModal';

const PayNowScreen = props => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(500);
  const [calcDiscount, setCalcDiscount] = useState(0);
  const [authorizePayment, setAuthorizePayment] = useState('red');
  const [disabled, setDisabled] = useState(true);
  const backIcon = <Icon name="arrow-back-outline" size={25} color="black" />;
  const checkoutList = useSelector(state => state.user.cartItems);
  const discount = useSelector(state => state.user.discount);
  const balance = useSelector(state => state.user.balance);
  const formatBalance = balance.toLocaleString()
  const formatTotalPrice = totalPrice.toLocaleString()
  const formatSubTotal = subTotal.toLocaleString()
  const formatDeliveryFee = deliveryFee.toLocaleString()
  const formatCalcDiscount = calcDiscount.toLocaleString()
  const location = useSelector(state => state.user.location);
  const [modalStatus, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  const openModal = () => {
    setOpenModal(true);
  };

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
    {
      balance >= calcTotal
        ? [setAuthorizePayment('green'), setDisabled(false)]
        : [setAuthorizePayment('red'), setDisabled(true)];
    }
    return () => {
      sumSubTotal, sumPrices, calcDiscount, calcTotal
    }
  }, [checkoutList, subTotal, deliveryFee, discount, balance]);

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
      <View style={styles.header}>
        <View style={styles.back}>
          <TouchableOpacity
            style={{marginRight: '2%'}}
            onPress={() => props.navigation.goBack()}>
            {backIcon}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Pay From Balance</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.balanceCard}>
          <Text style={[styles.balance, {color: authorizePayment}]}>₦{formatBalance}</Text>
        </View>
        <View style={styles.destinationView}>
          <View style={styles.destination}>
            <Text style={{fontWeight: 'bold', marginBottom: '2%'}}>Deliver To:</Text>
            {<Text>{location}</Text>}
          </View>
          <View style={styles.change}>
            <TouchableOpacity>
              <Text style={{color: 'rgb(230,230,250)'}}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {modalStatus ? (
        <OrderPlacedModal
          navigation={props.navigation}
          modalVisible={modalStatus}
          closeModal={closeModal}
        />
      ) : null}
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
          disabled={disabled}
          onPress={() => openModal()}
          style={styles.payNow}>
          <Text style={{color: 'whitesmoke'}}>Pay Now</Text>
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
    height: '14%',
    borderBottomWidth: 1,
    margin: '4%',
  },
  back: {
    //backgroundColor: 'green',
    height: '55%',
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
  body: {
    height: '52%',
    //backgroundColor: 'brown',
    marginLeft: '4%',
    marginRight: '4%',
    justifyContent: 'space-around',
  },
  destinationView: {
      justifyContent: 'space-between',
      //backgroundColor: 'green',
      height: '20%'
  },
  change: {
      backgroundColor: 'black',
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40%',
      borderRadius: 10,
      marginTop: '3%'
  },
  balanceCard: {
    //width: '90%',
    height: '60%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  balance: {
    fontSize: 45,
    fontWeight: 'bold',
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
  payNow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: '90%',
    backgroundColor: 'black',
    height: '80%',
  },
});

export default PayNowScreen;
