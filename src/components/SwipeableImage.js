import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Card } from "react-native-paper";
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
          <LinearGradient
            style={styles.modalView}
            colors={["#e2f0f7", "#c8e9ef", "#f5e2ce", "#fae5da"]}
          >
            <Text style={styles.modalText}>{user.name}'s Profile</Text>
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
              }}
            >
              <Image
                source={{ uri: user.profileImage }}
                style={styles.modalPhoto}
              />
            </View>
            <Card style={styles.cardContainer}>
              <Card.Content>
                <View>
                  <Text style={styles.bioText}>Age: {user.age}</Text>
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.cardContainer}>
              <Card.Content>
                <View>
                  <Text style={styles.bioText}>Location: {user.location}</Text>
                </View>
              </Card.Content>
            </Card>
            <Card style={styles.cardContainer}>
              <Card.Content>
                <View>
                  <Text style={styles.bioText}>Biography: {user.bio} </Text>
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
        <Image source={{ uri: user.profileImage }} style={styles.photo} />
      </Pressable>
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={[styles.textPrimary, styles.textShadow]}>
            {user.name}
          </Text>
        </View>
        <View style={styles.textRow}>
          <FontAwesome name="map-marker" size={20} color="white"></FontAwesome>
          <Text style={[styles.textSecondary, styles.textShadow]}>
            {user.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  bioText: {
      fontWeight:"bold",
  },
  photo: {
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  modalPhoto: {
    height: 200,
    width: 200,
    borderRadius: 40,
    marginBottom: 10,
  },
  textContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textPrimary: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  textSecondary: {
    color: "white",
    fontSize: 25,
    marginLeft: 10,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.80)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalView: {
    margin: 20,
    width: "90%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#064163",
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 24,
  },
  textStyle: {
    color: "#064163",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#064163",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
