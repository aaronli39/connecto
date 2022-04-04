import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder} from 'react-native';
import { useState, useMemo, useRef } from "react";
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Photos = [
    { id: "1", uri: require('../assets/connecto1.jpg') },
    { id: "2", uri: require('../assets/connecto2.jpg') },
    { id: "3", uri: require('../assets/connecto3.jpg') },
    { id: "4", uri: require('../assets/connecto4.jpg') }
  ]

export default function Swipe(){
    const position = useRef(new Animated.ValueXY()).current;
    const curr_index = 0;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });
    const rotateAndTranslate = {
      transform: [{
        rotate: rotate
      },
      ...position.getTranslateTransform()
      ]
    }
    const panResponder = useMemo(() => PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {},
    }), []);

    return (
      Photos.map((item, i) =>{
        if (i < curr_index) {
          return null;
        } else if (i == curr_index) {  
            return (
                <Animated.View
                {...panResponder.panHandlers}
                  key={i}
                  style={[
                    rotateAndTranslate,
                    {
                      height: SCREEN_HEIGHT - 240,
                      width: SCREEN_WIDTH,
                      padding: 10,
                      position: 'absolute'
                    }
                  ]}
                >
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 20
                    }}
                    source={item.uri}
                  />
                </Animated.View>
            )
          }
          else {
            return (
              <Animated.View
                key={i}
                style={{
                  height: SCREEN_HEIGHT - 240,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute"
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                  source={item.uri}
                />
              </Animated.View>
            );
          }    
          }).reverse()
  )
    }
