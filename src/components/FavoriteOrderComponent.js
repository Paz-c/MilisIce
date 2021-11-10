import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import vanilla from '../assets/vanilla.jpg';
import ProfileButtons from './ProfileButtons';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderNowModal from './OrderNowModal';
import {useSelector} from 'react-redux';

const FavoriteOrderComponent = ({navigation}) => {
  const starIcon = <Icon name="star" size={25} color="black" />;
  const [modalStatus, setOpenModal] = useState(false);
  const order = useSelector(state => state.user.orderNow);

  const closeModal = () => {
    setOpenModal(false);
  };
  const openModal = () => {
    setOpenModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <Text style={styles.title}>Vanilla</Text>
          <Text> {starIcon} </Text>
        </View>
        <Text>
          Hot Fudge, Sprinkles, Caramel, Oreos, Cookie Dough, Whipped Cream,
          Hard Chocolate Coating.
        </Text>
      </View>
      <View style={styles.body}>
        <Image source={vanilla} style={styles.image} />
      </View>
      {modalStatus ? (
        <OrderNowModal
          navigation={navigation}
          order={order}
          modalVisible={modalStatus}
          closeModal={closeModal}
        />
      ) : null}
      <TouchableOpacity onPress={() => openModal()} style={styles.footer}>
        <ProfileButtons title="ORDER NOW" width="80%" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '2%',
    width: '100%',
    height: '100%',
    //backgroundColor: 'green',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  header: {
    height: '20%',
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  body: {
    height: '65%',
    //backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  footer: {
    height: '15%',
    // backgroundColor: 'violet',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    width: '90%',
    //backgroundColor: 'green',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default FavoriteOrderComponent;
