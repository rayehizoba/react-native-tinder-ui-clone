import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-remote-svg';
import zzzIcon from './assets/zzz.svg';

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.container} >
        <View style={styles.zzzContainer} >
          <Image source={zzzIcon} style={styles.zzz} />
        </View>
        <Text style={styles.heading} >That's all folks...</Text>
        <Text style={styles.caption} >No more cards to display.</Text>
        <TouchableOpacity onPress={() => this.props.reloadCards()} >
          <Text style={styles.btn} >RELOAD CARDS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zzzContainer: { padding: 20 },
  zzz: {
    height: 75,
    width: 75,
  },
  caption: {
    fontWeight: '400',
    fontSize: 14,
    color: '#a5a5a5',
    padding: 8,
    letterSpacing: 0.5
  },
  heading: {
    fontWeight: '600',
    fontSize: 20,
  },
  btn: {
    fontSize: 14,
    fontWeight: '800',
    borderWidth: 0.5,
    borderColor: '#a5a5a5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    color: '#4bdb79',
    margin: 8
  }
});