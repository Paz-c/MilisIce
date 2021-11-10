import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FavoriteOrderComponent from './FavoriteOrderComponent';
import HistoryListComponent from './HistoryListComponent';
import ProfileButtons from './ProfileButtons';
import {getAuth} from 'firebase/auth';
import {useSelector} from 'react-redux';

const profileCard = props => {
  const balance = useSelector(state => state.user.balance);
  const formatBalance = balance.toLocaleString();
  const {height} = Dimensions.get('screen');
  const cardHeight = height * props.height;
  const history = useSelector(state => state.user.history);
  const auth = getAuth();

  const HistoryList = history.map((item, i) => {
    return (
      <HistoryListComponent
        flavor={item.flavor}
        topping={item.topping}
        date={item.date}
        image={item.image}
        key={i}
        id={item.id}
        cart={item.cart}
        price={item.price}
        amount={item.amount}
        favorite={item.favorite}
      />
    );
  });
  return (
    <View
      style={[
        {
          height: cardHeight,
          padding: props.padding,
          justifyContent: props.justifyContent,
        },
        styles.card,
      ]}>
      {props.title === 'BALANCE' ? (
        <View style={styles.balance}>
          <View>
            <Text style={styles.balanceTitle}>{props.title}</Text>
            <Text style={styles.balanceFigure}>₦{formatBalance}</Text>
          </View>
          <TouchableOpacity
            onPress={() => auth.signOut()}
            style={{width: '80%', marginLeft: '37%'}}>
            <ProfileButtons marginTop="3%" title="FUND" width="40%" />
          </TouchableOpacity>
        </View>
      ) : props.title === 'FAVORITE ORDER' ? (
        <View>
          <FavoriteOrderComponent navigation={props.navigation} />
        </View>
      ) : props.title === 'ORDER HISTORY' ? (
        <View>
          <View style={styles.orderHistory}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('History')}>
              <Text style={{fontWeight: 'bold'}}>Order History </Text>
            </TouchableOpacity>
          </View>
          {HistoryList}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgb(230,230,250)',
    width: '95%',
    marginTop: '3%',
    borderRadius: 20,
    borderColor: 'rgb(230,230,250)',
    borderWidth: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 30,
  },
  balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceTitle: {
    color: 'silver',
    //marginRight: '50%',
    //marginTop: '-10%',
    fontWeight: 'bold',
  },
  balanceFigure: {
    fontWeight: '600',
    fontSize: 25,
  },
  orderHistory: {
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '5%',
    marginBottom: '2%',
    borderBottomWidth: 2,
    justifyContent: 'space-evenly',
  },
});

export default profileCard;
