import React from 'react';
import { 
  StyleSheet, 
  Text, 
  Image as RNImage,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.position = this.props.position;
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    const defaultScale = this.props.isActive ? 0.9 : 0.85;
    this.nextCardScale = this.props.parentPosition ? this.props.parentPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [0.9, 0.85, 0.9],
      extrapolate: 'clamp',
    }) : defaultScale;  
    this.rotateAndTranslate = {
      transform: [
        { rotate: this.rotate },
        { scale: this.nextCardScale },
        ...this.position.getTranslateTransform()
      ]
    };
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });
    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }); 
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState) => this.props.isActive,
      onPanResponderMove:(evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease:(evt, gestureState) => {
        if (gestureState.dx > 120) {
          this.props.handleNopeSelect(gestureState.dy, this.position);
        } else if (gestureState.dx < -120) {
          this.props.handleLikeSelect(gestureState.dy, this.position);
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start();
        }
      }
    })
  }

  render() {
    return (
      <Animated.View {...this.PanResponder.panHandlers} // <----- This is what binds to the PanResponder's onPanResponderMove handler
        style={[
          this.rotateAndTranslate,
          styles.card,
        ]} >
  
        <Animated.View 
          style={[
            styles.cardTextContainer, 
            styles.cardTextContainerLike,
            { opacity: this.likeOpacity }
          ]}
        >
          <Text style={[styles.cardText, styles.cardTextLike]} >LIKE</Text>
        </Animated.View>
        <Animated.View 
          style={[
            styles.cardTextContainer, 
            styles.cardTextContainerNope,
            { opacity: this.nopeOpacity }
          ]}
        >
          <Text style={[styles.cardText, styles.cardTextNope]} >NOPE</Text>
        </Animated.View>
  
        <RNImage style={styles.cardImg} source={this.props.image} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  cardImg: {
    borderRadius: 20,
    height: null,
    width: null,
    resizeMode: 'cover',
    flex: 1,
  },
  card: {
    position: 'absolute',
    height: '105%',
    width: SCREEN_WIDTH,
    // shadowOffset:{ width: 0,  height: 2, },
    // shadowOpacity: .2,
    // shadowRadius: 5,
  },
  cardTextContainer: {
    position: 'absolute',
    top: 45,
    zIndex: 999,
  },
  cardText: {
    borderWidth: 2,
    fontSize: 30,
    fontWeight: '800',
    padding: 10,
    borderRadius: 4,
  },
  cardTextContainerLike: {
    right: 45,
    transform: [
      {rotate: '15deg'}
    ]
  },
  cardTextLike: {
    color: '#4bdb79',
    borderColor: '#4bdb79',
  },
  cardTextContainerNope: {
    left: 45,
    transform: [
      {rotate: '-15deg'}
    ]
  },
  cardTextNope: {
    color: '#D80027',
    borderColor: '#D80027',
  }
});
