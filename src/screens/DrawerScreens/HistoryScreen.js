import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import HistoryListComponent from '../../components/HistoryListComponent';
import vanilla from '../../assets/vanilla.jpg';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const HistoryScreen = props => 
{
  const history = useSelector(state => state.user.history);
  const menuIcon = <Icon name="arrow-back-outline" size={25} color="black" />;

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginBottom: '10%'}} onPress={() => props.navigation.goBack()}>
          {menuIcon}
        </TouchableOpacity>
        <Text style={{fontSize: 25,fontWeight: '600'}}>HISTORY</Text>
      </View>
      <ScrollView style={styles.body}>{HistoryList}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(230,230,250)',
  },
  header: {
    //backgroundColor: 'green',
    //height: '18%',
    padding: '2%'
  },
  body: {
    height: '90%',
    borderTopWidth: 2,
    paddingTop: '2%',
    paddingBottom: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    //borderBottomWidth: 2,
    //backgroundColor: 'yellow',
  },
});

export default HistoryScreen;

