// Önce firebaseConfig.js dosyasını içe aktarın
import firebase from "./firebaseConfig";

// Kullanıcı Kayıt Fonksiyonu
export const register = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Kayıtlı kullanıcı: ", user);
    // Burada ek işlemler yapabilirsiniz, örneğin kullanıcı bilgilerini bir veritabanına kaydetmek
  } catch (error) {
    console.error("Kullanıcı kaydı sırasında hata oluştu: ", error.message);
    // Hata mesajını uygun bir şekilde işleyebilir veya kullanıcıya gösterebilirsiniz
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
    // Giriş yapan kullanıcı ile ilgili işlemler yapabilirsiniz
  } catch (error) {
    console.error("Giriş yapılırken hata oluştu: ", error.message);
    // Hata mesajını işleyebilir veya kullanıcıya gösterebilirsiniz
    throw error;
  }
};

// Kullanıcı Çıkış Fonksiyonu
export const logout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("Kullanıcı çıkış yaptı");
    // Çıkış işleminden sonra yapılacak işlemler
  } catch (error) {
    console.error("Çıkış yapılırken hata oluştu: ", error.message);
    // Hata mesajını işleyebilir veya kullanıcıya gösterebilirsiniz
    throw error;
  }
};
