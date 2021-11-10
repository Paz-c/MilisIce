import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import HistoryItemModal from './HistoryItemModal';


const HistoryListComponent = props => {

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <TouchableOpacity onPress={openModal} style={styles.container}>
      <View style={styles.imageContainer}><Image source={props.image} style={styles.image} /></View>
      <View style={styles.textView}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.title}</Text>
          <Text>{props.topping}</Text>
      </View>
      {modalVisible ? (
        <HistoryItemModal
          closeModal={closeModal}
          openModal={openModal}
          modalVisible={modalVisible}
          cart={props.cart}
          id={props.id}
          image={props.image}
          flavor={props.flavor}
          topping={props.topping}
          price={props.price}
          amount={props.amount}
          favorite={props.favorite}
        />
      ) : null}
      <View style={styles.date}><Text style={{fontSize: 12,}}>{props.date}</Text></View>
    </TouchableOpacity>
  );
};

const {height} = Dimensions.get('screen');
const cardHeight = height * 0.07;
const imageSize = height * 0.08;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    //backgroundColor: 'green',
    flexDirection: 'row',
    paddingBottom: '2%',
    marginBottom: '2%',
    height: imageSize
  },
  imageContainer: {
    width: '15%',
    //backgroundColor: 'orange',
    borderWidth: 2,
    width: cardHeight,
    height: cardHeight,
    borderRadius: 30
  },
  textView: {
    width: '65%',
   // backgroundColor: 'blue',
    justifyContent: 'center',
    paddingLeft: 7,
    //paddingRight: 7,
  },
  date: {
    width: '20%',
    //backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain'
  },
});

export default HistoryListComponent;
