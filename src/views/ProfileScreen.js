import React from "react";
import { View, ScrollView, Text , TouchableOpacity, ImageBackground, TextInput, StyleSheet, FlatList,
	Dimensions} from "react-native";
import { Button, useTheme, withTheme } from "react-native-paper";
import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";
import UploadImage from './UploadImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import UploadImageList from "./UploadImageList";



// THIS IS JUST A TEST FILE FOR NAVIGATION, PLEASE DELETE OR REPLACE THIS COMPONENT!
const ProfileScreen = ({ navigation }) => {
	const { width } = Dimensions.get('window');
	const SPACING = 10;
	const THUMB_SIZE = 80;
	const DATA = [
		{image: <UploadImageList/>, id: "1"},
		{image: <UploadImageList/>, id: "2"},
		{image: <UploadImageList/>, id: "3"},
		{image: <UploadImageList/>, id: "4"},
		{image: <UploadImageList/>, id: "5"},
		{image: <UploadImageList/>, id: "6"},
	]
	const { colors } = useTheme();
	return (
		
		<ScrollView styles={styles.container} contentContainerStyle={{marginTop: 50, paddingBottom: 60, marginLeft: 10, marginRight:10 , justifyContent: "center",  alignItems: "center"}}>
			<UploadImage style={{alignSelf: "center"}}/>
			<FlatList
				horizontal={true}
				data={DATA}
				style={{marginTop:"5%", marginBottom: "5%"}}
				
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: SPACING
				}}
				keyExtractor={item => item.id}
				renderItem={({ item, index }) => (
					<TouchableOpacity activeOpacity={0.9}>
					<UploadImageList
						style={{
						width: THUMB_SIZE,
						height: THUMB_SIZE,
						marginRight: SPACING,
						borderRadius: 16,
						//borderWidth: index === indexSelected ? 4 : 0.75,
						//borderColor: index === indexSelected ? 'orange' : 'white'
						}}
					/>
					</TouchableOpacity>
				)}
				/>

			<Text style={{alignSelf:"center" , fontWeight:"bold"}}>James Chen</Text>
			<View style={styles.action}>
				<Feather name="info" color={colors.text} size={20} />
				<TextInput
				placeholder="Biography"
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
					styles.textInput,
					{
					color: colors.text,
					},
				]}
				/>
			</View>
			<View style={styles.action}>
				<FontAwesome name="user-o" color={colors.text} size={20} />
				<TextInput
				placeholder="First Name"
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
					styles.textInput,
					{
					color: colors.text,
					},
				]}
				/>
			</View>
			<View style={styles.action}>
			<FontAwesome name="user-o" color={colors.text} size={20} />
			<TextInput
				placeholder="Last Name"
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<Feather name="phone" color={colors.text} size={20} />
			<TextInput
				placeholder="Phone"
				placeholderTextColor="#666666"
				keyboardType="number-pad"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<FontAwesome name="envelope-o" color={colors.text} size={20} />
			<TextInput
				placeholder="Email"
				placeholderTextColor="#666666"
				keyboardType="email-address"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<FontAwesome name="globe" color={colors.text} size={20} />
			<TextInput
				placeholder="Country"
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<Icon name="map-marker-outline" color={colors.text} size={20} />
			<TextInput
				placeholder="City"
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          		<Text style={styles.panelButtonTitle}>Update Profile</Text>
        	</TouchableOpacity>
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#fff"
	},
	commandButton: {
	  padding: 15,
	  borderRadius: 10,
	  backgroundColor: 'blue',
	  alignItems: 'center',
	  marginTop: 10,
	},
	panel: {
	  padding: 20,
	  backgroundColor: '#FFFFFF',
	  paddingTop: 20,
	},
	header: {
	  backgroundColor: '#FFFFFF',
	  shadowColor: '#333333',
	  shadowOffset: {width: -1, height: -3},
	  shadowRadius: 2,
	  shadowOpacity: 0.4,
	  // elevation: 5,
	  paddingTop: 20,
	  borderTopLeftRadius: 20,
	  borderTopRightRadius: 20,
	},
	panelHeader: {
	  alignItems: 'center',
	},
	panelHandle: {
	  width: 40,
	  height: 8,
	  borderRadius: 4,
	  backgroundColor: '#00000040',
	  marginBottom: 10,
	},
	panelTitle: {
	  fontSize: 27,
	  height: 35,
	},
	panelSubtitle: {
	  fontSize: 14,
	  color: 'gray',
	  height: 30,
	  marginBottom: 10,
	},
	panelButton: {
	  padding: 13,
	  borderRadius: 10,
	  backgroundColor: '#FF6347',
	  alignItems: 'center',
	  marginVertical: 7,
	},
	panelButtonTitle: {
	  fontSize: 17,
	  fontWeight: 'bold',
	  color: 'white',
	},
	action: {
	  flexDirection: 'row',
	  marginTop: 10,
	  marginBottom: 10,
	  borderBottomWidth: 1,
	  borderBottomColor: '#f2f2f2',
	  paddingBottom: 5,
	},
	actionError: {
	  flexDirection: 'row',
	  marginTop: 10,
	  borderBottomWidth: 1,
	  borderBottomColor: '#FF0000',
	  paddingBottom: 5,
	},
	textInput: {
	  flex: 1,
	  marginTop: Platform.OS === 'ios' ? 0 : -12,
	  paddingLeft: 10,
	  color: '#05375a',
	},
  });
