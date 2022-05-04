import React from 'react'
import {View, Image, StyleSheet, Text} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
//Actual Image of Users to display on View
export default function SwipeableImage({ user }) {
  return (
    <View>
        <Image source = {{uri: user.profileImage}} style={styles.photo}/>
        <View style= {styles.textContainer}>
            <View style= {styles.textRow}>
                <Text style= {[styles.textPrimary, styles.textShadow]}>{user.name}</Text>
                <Text style= {[styles.textSecondary, styles.textShadow]}>{user.age}</Text>
            </View>
            <View style={styles.textRow}>
                <FontAwesome name="map-marker" size={20} color="white"></FontAwesome>
                <Text style={[styles.textSecondary, styles.textShadow]}>{user.location}</Text>
            </View>
            <View style={styles.textRow}>
                <Text style={[styles.textSecondary, styles.textShadow]}>{user.bio}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    photo: {
        height:'100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    textContainer: {
        position:'absolute',
        bottom: 20,
        left: 20,
    },
    textRow: {
        flexDirection:'row',
        alignItems:'center',
    },
    textPrimary: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    textSecondary: {
        color: 'white',
        fontSize: 25,
        marginLeft: 10,
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.80)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
      }

})
