import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

/*This Component renders the like and dislike button at the bottom of the page*/
export default function BottomBar({handleLikePress, handleDislikePress}) {
  return (
    <View style={styles.container}>
      <View />
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="times" size={30} color="red" onPress={handleDislikePress}></FontAwesome>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="heart" size={30} color="#64EDCC" onPress={handleLikePress}></FontAwesome>
      </TouchableOpacity>
      <View />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
})
