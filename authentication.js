// authentication.js
import firebase from "./firebaseConfig";

// Kullanıcı Kayıt Fonksiyonu
export const register = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Kayıtlı kullanıcı: ", user);
    // Kullanıcı kayıt sonrası işlemler
  } catch (error) {
    console.error("Kullanıcı kaydı sırasında hata oluştu: ", error.message);
    throw error;
  }
};

// Kullanıcı Giriş Fonksiyonu
export const login = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Giriş yapan kullanıcı: ", user);
    // Kullanıcı giriş sonrası işlemler
  } catch (error) {
    console.error("Giriş yapılırken hata oluştu: ", error.message);
    throw error;
  }
};

// Kullanıcı Çıkış Fonksiyonu
export const logout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Kullanıcı çıkış yaptı");
    // Kullanıcı çıkış sonrası işlemler
  } catch (error) {
    console.error("Çıkış yapılırken hata oluştu: ", error.message);
    throw error;
  }
};
