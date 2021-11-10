import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeItems from '../../components/HomeItems';
import HomeSuggestionCard from '../../components/HomeSuggestionCard';
import SearchBar from '../../components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCartItems, addToFavorites, removeCartItem, removeFromFavorites, setSearch} from '../../redux/slices/UserSlice';


const HomeScreen = ({navigation}) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const cartIcon = <Icon name="search-outline" size={30} color="black" />;
  const homeItems = useSelector(state => state.user.homeItems);
  const search = useSelector(state => state.user.search);
  const homeSuggestionItems = useSelector(state => state.user.homeSuggestionItems);
  const dispatch = useDispatch();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const searchResult = homeItems.filter(listItem =>
    listItem.flavor.toLowerCase().includes(search.toLowerCase()),
  );

  const displayItems = searchResult.map((items, i) => {
    return (
      <HomeItems
        flavor={items.flavor}
        price={items.smallPrice}
        image={items.image}
        key={i}
        addToCart={() => dispatch(addToCartItems({id: items.id}))}
        addToFavorites ={() => dispatch(addToFavorites({id: items.id}))}
        removeFromFavorites ={() => dispatch(removeFromFavorites({id: items.id}))}
        favorite={items.favorite}
        id={items.id}
        cart={items.cart}
        navigation={navigation}
      />
    );
  });

  const displaySuggestionItems = homeSuggestionItems.map((items, i) => {
    return (
      <HomeSuggestionCard
        image={items.image}
        key={i}
        title={items.title}
        value={items.value}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30}}>MilisIce</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Text style={{fontSize: 30}}>{cartIcon}</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
      {searchVisible ? (
        <SearchBar/>
        ) : null}
        </View>
      <ScrollView style={styles.itemsView}>
        <View style={styles.SuggestionCardView}>
          <TouchableOpacity style={styles.SuggestionCardView}>
            {displaySuggestionItems}
          </TouchableOpacity>
        </View>
        {displayItems}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,250)',
    //rgb(230,230,250)
    //#e50d31
  },
  SuggestionCardView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    margin: 10,
  },
  itemsView: {
    height: '100%',
  },
});

export default HomeScreen;
