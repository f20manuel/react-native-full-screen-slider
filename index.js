import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Title, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Slider = ({props}) => {
  const { data: [] } = props

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const dot = (index) => {
    const width = scrollX.interpolate({
      inputRange: [
        windowWidth * (index - 1),
        windowWidth * index,
        windowWidth * (index + 1),
      ],
      outputRange: [8, 16, 8],
      extrapolate: 'clamp',
    });
    return <Animated.View key={0} style={[styles.normalDot, { width, 
      backgroundColor: data.dotColor || 'white',}]} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}>
            {data?(
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: windowWidth,
                  padding: 16,
                  backgroundColor: "green",
                }}
                key={0}>
                <Image
                  source={{ uri: "https://via.placeholder.com/400?text='Prop: data.image (type: require)'"}}
                  style={{
                    borderRadius: 20,
                    width: 200,
                    height: 200,
                  }}
                />
                <Title style={{ color: 'white', textAlign: 'center' }}>
                  Prop: data.descripction
                </Title>
              </View>
            ):data.map((item, index) => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: windowWidth,
                  padding: 16,
                  backgroundColor: item.backgroundColor || "green",
                }}
                key={index}>
                  {item.image?(
                    <Image
                      source={require(item.image)}
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    />
                  ):null}
                <Title style={{ color: item.descriptionColor || 'white', textAlign: 'center' }}>
                  {item.description}
                </Title>
              <Button style={{position: "absolute", bottom: 0}} color="#ffec4f">Omitir</Button>
              </View>
            ))}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {data?dot(0):data.map((item, index) => {dot(index)})}
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  scrollContainer: {
    height: '98%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Slider;
