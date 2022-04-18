import { initializeApp } from "firebase/app";
import "firebase/storage";
import { CONFIGS } from "../constants/config.js";

const firebaseConfig = {
	apiKey: CONFIGS.FIRE_BASE_API,
	authDomain: "xc475-connecto.firebaseapp.com",
	projectId: "xc475-connecto",
	storageBucket: "xc475-connecto.appspot.com",
	messagingSenderId: "473690460289",
	appId: "1:473690460289:web:86a6549aa86764b41b7d80",
	measurementId: "G-RNJ8PM5ZVK",
	storageBucket: "gs://xc475-connecto.appspot.com",
};

const firebase = initializeApp(firebaseConfig);

export { firebase };
