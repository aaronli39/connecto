import React, {useState} from 'react'
import {View, Image, StyleSheet, Text, Modal, Pressable} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons'
import { Card } from 'react-native-paper';
//Actual Image of Users to display on View
export default function SwipeableImage({ user }) {
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
        <Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
                    <LinearGradient style={styles.modalView} colors={["#4286f4", "#373B44"]}>
						<Text style={styles.modalText}>{user.name}'s Profile</Text>
                        <Image source = {{uri: user.profileImage}} style={styles.modalPhoto}/>
                        <Card style= {styles.cardContainer}>
                            <Card.Content>
                                <View>
                                    <Text>Age: {user.age}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                        <Card style= {styles.cardContainer}>
                            <Card.Content>
                                <View>
                                    <Text>Location: {user.location}</Text>
                                </View>
                            </Card.Content>
                        </Card>
                        <Card style= {styles.cardContainer}>
                            <Card.Content>
                                <View>
                                    <Text>Biography: {user.bio} </Text>
                                </View>
                            </Card.Content>
                        </Card>
                        
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Close Profile</Text>
						</Pressable>
                    </LinearGradient>
				</View>
			</Modal>
        <Pressable onPress={() => setModalVisible(true)}>
            <Image source = {{uri: user.profileImage}} style={styles.photo}/>
        </Pressable>
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
    cardContainer: {
		borderRadius: 12,
        width:"100%",
        margin: 10,
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
        
	},
    photo: {
        height:'100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    modalPhoto: {
        height:200,
        width:200,
        borderRadius: 100,
        marginBottom:10,
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
      },
      centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
		
	},
	modalView: {
		margin: 20,
        height:"90%",
        width:"95%",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
        marginTop: 30,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		color: "white",
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
		fontSize: 20,
	},
})
