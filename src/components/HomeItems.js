import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const HomeItems = props => {
  const checkCartArrayChange = useSelector(state => state.user.cartItems);
  const [favoriteName, setFavoriteName] = useState('heart-outline');
  const [favoriteHighlight, setFavoriteHighlight] = useState('black');
  const [toCartBtn, setToCartBtn] = useState('To Cart');
  const formatPrice = props.price.toLocaleString()

  useEffect(() => {
    props.favorite
      ? setFavoriteName('heart')
      : setFavoriteName('heart-outline');
    props.favorite
      ? setFavoriteHighlight('brown')
      : setFavoriteHighlight('black');
    props.cart ? setToCartBtn('Uncart') : setToCartBtn('To Cart');
  }, [checkCartArrayChange]);

  const shareIcon = (
    <Icon name="share-social-outline" size={30} color="black" />
  );
  const favoriteIcon = (
    <Icon name={favoriteName} size={30} color={favoriteHighlight} />
  );
  //rgb(143,98,81)
  const editIcon = <Icon name="color-wand-outline" size={30} color="black" />;

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{props.flavor}</Text>
          <Text style={styles.titleDets}>
            Hot Fudge, Sprinkles, Caramel, Oreos, Cookie Dough, Whipped Cream...
          </Text>
        </View>
        <View style={styles.actionsView}>
          <TouchableOpacity
            onPressIn={props.addToFavorites}
            style={[styles.actions]}>
            <Text>{favoriteIcon}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Build")} style={[styles.actions]}>
            <Text>{editIcon}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actions]}>
            <Text>{shareIcon}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemView}>
        <Image source={props.image} style={styles.image} />
      </View>
      <View style={styles.footer}>
        <View style={styles.price}>
          <Text style={{color: 'black', fontSize: 20}}>₦{formatPrice}</Text>
        </View>
        <TouchableOpacity onPress={props.addToCart} style={styles.addToCart}>
          <Text style={{color: 'rgb(230,230,250)', fontSize: 20}}>
            {toCartBtn}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const paperSize = height * 0.6;

const styles = StyleSheet.create({
  container: {},
  main: {
    height: paperSize,
    backgroundColor: 'rgb(230,230,250)',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    margin: 10,
    shadowColor: 'black',
    shadowOpacity: 1,
  },
  title: {
    fontSize: 25,
    color: 'black',
  },
  titleDets: {
    //fontSize: 16,
    //margin: 10,
    //color: 'gold'
  },
  header: {
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'green'
  },
  itemView: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green'
  },
  price: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    marginTop: '3%',
    marginBottom: '3%',
    height: 50,
  },
  addToCart: {
    backgroundColor: 'black',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    marginTop: '3%',
    marginBottom: '3%',
    height: '70%',
    borderRadius: 20,
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  actionsView: {
    //flexDirection: 'column',
    margin: 10,
    marginTop: 10,
    //width: '20%'
  },
  actions: {
    width: 35,
    height: 35,
    margin: 4,
  },
  titleView: {
    width: '75%',
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeItems;
