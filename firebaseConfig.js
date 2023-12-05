import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD1fhDJ5t43XZKn6biMaHDPJpiTkj_EhRk",
  authDomain: "login3-26184.firebaseapp.com",
  projectId: "login3-26184",
  storageBucket: "login3-26184.appspot.com",
  messagingSenderId: "254744172236",
  appId: "1:254744172236:web:20043b41595b3307175469",
};
// firebaseConfig.js içinde

export const logout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Kullanıcı çıkış yaptı");
  } catch (error) {
    console.error("Çıkış yapılırken hata oluştu: ", error.message);
    throw error;
  }
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
