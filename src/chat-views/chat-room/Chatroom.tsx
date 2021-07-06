import React, {useEffect, useRef, useState} from 'react';
import {Text, View, ViewToken} from 'react-native';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';
import UserTextMessage from '../../chat-messages/text-message/UserTextMessage';
import {Post} from '../../shared/types/Post';
import axios from 'axios';
import ImageMessage from "../../chat-messages/image-message/ImageMessage";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  itemVisiblePercentThreshold: 45,
  waitForInteraction: false,
};

function renderItem({item}: {item: Post}) {
  return <UserTextMessage message={item.title} key={item.id} />;
}

function keyExtractor(item: Post) {
  return item.title;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Post[]>([]);

  const onViewAbleItemsChange = useRef(
    ({changed}: {changed: Array<ViewToken>}) => {
      console.log(changed);
    },
  ).current;

  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      // console.log(event.contentOffset.y);
    },
  });

  useEffect(() => {
    axios
      .get('http://jsonplaceholder.typicode.com/posts')
      .then(({data}: {data: Post[]}) => {
        setMessages(data);
      })
      .catch(_ => console.log('sex'));
  }, []);

  return (
    <View style={styles.rootContainer}>
      <ImageMessage />
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
