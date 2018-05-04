import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Image as RNImage,
  Dimensions,
  Animated
} from 'react-native';
import Image from 'react-native-remote-svg';
import checkIcon from './assets/checked.svg';
import cancelIcon from './assets/cancel.svg';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const Users = [
  {id: "1", uri: require('./assets/image1.jpg')},
  {id: "2", uri: require('./assets/image2.jpg')},
  {id: "3", uri: require('./assets/image3.jpg')},
  {id: "4", uri: require('./assets/image4.jpg')},
  {id: "5", uri: require('./assets/image5.jpg')},
]

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.toolbar} />
        <View style={styles.cardArea} >
          {Users.map((user, index) => (
            <Animated.View style={[styles.card, {transform: [{translateY: index * 12}], padding: (index + 5) * 5}]} key={user.id} >
              <RNImage style={styles.cardImg} source={user.uri} />
            </Animated.View>
          )).reverse()}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}>
            <Image source={checkIcon} style={styles.btnIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Image source={cancelIcon} style={styles.btnIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  toolbar: {
    height: 50,
  },
  cardArea: {
    height: 'auto',
    flex: 1,
    paddingHorizontal: 15
  },
  btnContainer: {
    height: 120, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    backgroundColor: '#efefef'
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  cardImg: {
    borderRadius: 10,
    height: null,
    width: null,
    resizeMode: 'cover',
    flex: 1,
  },
  card: {
    position: 'absolute',
    height: SCREEN_HEIGHT - 170,
    width: SCREEN_WIDTH,
    shadowOffset:{ width: 0,  height: 2, },
    shadowOpacity: .2,
    shadowRadius: 15,
  }
});
