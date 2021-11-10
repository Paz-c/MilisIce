import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import { setSearch } from '../redux/slices/UserSlice';

const SearchBar = props => {

  const dispatch = useDispatch();

  const searchIcon = (
    <Icon name="search-outline" size={30} color="black" />
  );

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text>{searchIcon}</Text>
      </View>
      <View style={styles.inputField}>
        <TextInput
          onChangeText={(text) => dispatch(setSearch({text: text}))}
          placeholder="Search flavors here..."
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '90%',
    //backgroundColor: 'rgb(176,196,222)',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '3%',
    borderRadius: 50,
    //borderWidth: 2,
  },
  inputField: {
    paddingLeft: 10,
    //backgroundColor: 'blue',
    width: '87%',
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    //borderRightWidth: 1,
    height: 45,
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

{
  /*} const SearchBar = props => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Text></Text>
      </View>
      <View style={styles.inputField}>
        <TextInput
          onChangeText={props.result}
          placeholder='Search flavors here...'
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    //backgroundColor: 'green',
  },
  inputField: {
    paddingLeft: 10,
    backgroundColor: 'rgb(230,230,250)',
    width: '80%',
    //height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    //backgroundColor: 'red',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    //height: 45
  },
});  */
}

export default SearchBar;
