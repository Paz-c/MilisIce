import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ProfileCard from '../../components/ProfileCard';
import Icon from 'react-native-vector-icons/Ionicons';
import vanilla from '../../assets/vanilla.jpg';
import { useSelector } from 'react-redux';

const Dashboard = ({navigation}) => {
  const menuIcon = <Icon name="menu-outline" size={40} color="black" />;
  //const name = useSelector(state => state.user.name)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.dpView}>
            <Image source={vanilla} style={styles.dp} />
          </View>
          <Text style={styles.hi}>Hi, Naruto</Text>
        </View>
        <TouchableOpacity
          style={{marginRight: '2%'}}
          onPress={() => navigation.toggleDrawer()}>
          {menuIcon}
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.cardsView}>
          <ProfileCard
            height="0.12"
            title="BALANCE"
            padding="5%"
            justifyContent="center"
          />
        </View>
        <View style={styles.cardsView}>
          <ProfileCard
            height="0.50"
            title="FAVORITE ORDER"
            padding="5%"
            justifyContent="center"
            navigation={navigation}
          />
        </View>
        <View style={styles.cardsView}>
          <ProfileCard
            height="0.6"
            title="ORDER HISTORY"
            padding="2%"
            navigation={navigation}
            screen="History"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('screen');
const dpHeight = height * 0.08;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,250)',
    //flexDirection: 'row'
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  header: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardsView: {
    //justifyContent: 'space-around',
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: 'green'
  },
  hi: {
    fontSize: 25,
    fontWeight: '500',
    //marginTop: 17,
    //marginBottom: 10,
    marginLeft: 20,
  },
  lastOrder: {
    height: 500,
    width: '100%',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dpView: {
    width: dpHeight,
    height: dpHeight,
    marginLeft: '5%',
    borderWidth: 2,
    borderRadius: 50,
    //shadowColor: 'black',
    //shadowOpacity: 1,
    shadowRadius: 5,
    //paddingLeft: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dp: {
    height: '100%',
    width: '100%',
  },
});

export default Dashboard;
