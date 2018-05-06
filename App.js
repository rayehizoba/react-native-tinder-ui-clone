import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Image from 'react-native-remote-svg';
import checkIcon from './assets/checked.svg';
import cancelIcon from './assets/cancel.svg';
import Card from "./Card";
import img1 from './assets/image1.jpeg';
import img2 from './assets/image2.jpeg';
import img3 from './assets/image3.jpeg';
import img4 from './assets/image4.jpeg';
import img5 from './assets/image5.jpeg';
import EmptyState from './EmptyState';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const getCards = () => {
  const cards = [
    { id: '1', image: img1, isActive: true },
    { id: '2', image: img2, isActive: false },
    { id: '3', image: img3, isActive: false },
    { id: '4', image: img4, isActive: false },
    { id: '5', image: img5, isActive: false },
  ];
  let lastItemPosition = false;
  cards.forEach((card, i) => {
    const position = new Animated.ValueXY();
    card.position = position;
    card.parentPosition = lastItemPosition;
    lastItemPosition = position;
  });
  return cards;
}

export default class App extends React.Component {

  constructor() {
    super();

    const cards = getCards();

    this.state = {cards};
  }

  onCardSwiped = (id) => {
    this.setState(prevState => {
      const swipedIndex = prevState.cards.findIndex(card => card.id === id);
      const isLastIndex = swipedIndex === (prevState.cards.length - 1);
      const nextIndex = swipedIndex + 1;
      const newState = {...prevState};
      newState.cards[swipedIndex]['isActive'] = false;
      if (isLastIndex) return prevState;
      newState.cards[nextIndex]['isActive'] = true;
      return newState;
    });
  }

  handleNopeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  }

  handleLikeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  }

  renderCards = (cards) => {
    if (this.isEmptyState()) return <EmptyState reloadCards={this.reloadCards} />
    
    return cards.map((card, index) => {
      return <Card key={card.id} {...card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} />;
    }).reverse();
  }

  reloadCards = () => {
    const cards = getCards();
    this.setState({cards});
  }

  isEmptyState = () => {
    return this.state.cards.findIndex(card => card.isActive) < 0;
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.cardArea} >
          {this.renderCards(this.state.cards)}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => this.handleLikeSelect()} >
            <Image source={checkIcon} style={styles.btnIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.handleNopeSelect()} >
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
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  cardArea: {
    flex: 10,
    marginTop: 30
  },
  btnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  btn: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    backgroundColor: '#efefef',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
});
