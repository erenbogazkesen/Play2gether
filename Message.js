import firebase from "./firebaseConfig";

export const sendMessage = async (message, currentUser) => {
  if (!message.trim()) return;

  try {
    await firebase.firestore().collection("messages").add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: currentUser.uid,
    });
  } catch (error) {
    console.error("Mesaj gönderilirken hata oluştu: ", error);
    throw error;
  }
};

export const listenForMessages = (handleNewMessages) => {
  const messagesRef = firebase.firestore().collection("messages");

  return messagesRef.orderBy("createdAt", "desc").onSnapshot(
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      handleNewMessages(messages);
    },
    (error) => {
      console.error("Mesajları dinlerken hata oluştu: ", error);
    }
  );
};
