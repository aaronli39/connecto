import React from 'react'
import {StyleSheet} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipeableImage from './SwipeableImage'

//Component that handles swiping gestures
function SwipeHandle({users, currentIndex, handleLike, handleDislike, swipeHandleRef}) {

    //renders the next user when you swipe right
    const renderLeftActions = () => {
        return(
        <RectButton style={styles.container}>
            <SwipeableImage user={users[currentIndex + 1]}></SwipeableImage>
        </RectButton>
        )
    }

    //renders the next user when you swipe left
    const renderRightActions = () => {
        return(
        <RectButton style={styles.container}>
            <SwipeableImage user={users[currentIndex + 1]}></SwipeableImage>
        </RectButton>
        )
    }
    return (
        <Swipeable
            ref={swipeHandleRef}
            friction={1}
            leftThreshold={50}
            rightThreshold={50}
            //Renders component behind card
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={handleLike}//handles operations after like
            onSwipeableRightOpen={handleDislike}//hanldes operations after dislike

        >
            <SwipeableImage user={users[currentIndex]}></SwipeableImage>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})

export default React.forwardRef((props, ref) => <SwipeHandle swipeHandleRef={ref} {...props}></SwipeHandle>)
